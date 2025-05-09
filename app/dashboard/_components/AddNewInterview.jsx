'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button from '@mui/material/Button';
import { Input, TextareaAutosize } from '@mui/material';
import { sendMessage } from '../../../utils/GeminiAIModal';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import db from '../../../utils/db'; // Import the database connection
import { MockInterview } from '../../../utils/schema'; // Import your schema
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Manually define the user object for testing purposes
    const user = {
        primaryEmailAddress: {
            emailAddress: 'example@example.com'
        }
    };

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        if (!jobPosition || !jobDescription || !jobExperience) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }
    
        setError('');
        const questionsCount = process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT || 5; // Default to 5 questions if not set
        const InputPrompt = `Job Role: ${jobPosition}, Job Description: ${jobDescription}, Years of experience: ${jobExperience}, based on the details give me ${questionsCount} interview questions and answers in JSON format.`;
    
        try {
            console.log('Sending message:', InputPrompt);
            const result = await sendMessage(InputPrompt);
            console.log('API Result:', result);
    
            if (result) {
                let cleanedResponse = result.trim();
                console.log('Cleaned Response (Before Replacing):', cleanedResponse);
    
                cleanedResponse = cleanedResponse.replace(/```json/g, '').replace(/```/g, '');
                console.log('Cleaned Response (After Replacing):', cleanedResponse);
    
                try {
                    // Log the cleaned response before parsing
                    console.log('Cleaned Response for Parsing:', cleanedResponse);
    
                    // Replace control characters that might cause issues
                    const safeResponse = cleanedResponse.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
                    console.log('Safe Response:', safeResponse);
    
                    let parsedResponse;
                    try {
                        parsedResponse = JSON.parse(safeResponse);
                    } catch (jsonError) {
                        console.error('Error parsing JSON:', jsonError);
                        throw new Error('Failed to parse the JSON response.');
                    }
    
                    console.log('Generated Interview Questions and Answers:', parsedResponse);
    
                    // Check if parsedResponse is an array
                    if (!Array.isArray(parsedResponse)) {
                        console.error('Parsed response is not an array:', parsedResponse);
                        throw new Error('Parsed response is not an array');
                    }
    
                    // Add job-specific information to each question
                    parsedResponse = parsedResponse.map(question => ({
                        ...question,
                        jobPosition,
                        jobDesc: jobDescription,
                        jobExperience
                    }));
    
                    console.log('Parsed Response with Metadata:', parsedResponse);
    
                    try {
                        const mockId = uuidv4();
    
                        await db.insert(MockInterview).values({
                            mockId: mockId,
                            jsonMockResp: JSON.stringify(parsedResponse),
                            jobPosition: jobPosition,
                            jobDesc: jobDescription,
                            jobExperience: jobExperience,
                            createdBy: user?.primaryEmailAddress?.emailAddress,
                            createdAt: moment().format('DD-MM-YYYY')
                        });
    
                        console.log("Record inserted successfully: ", {
                            mockId: mockId,
                            jsonMockResp: JSON.stringify(parsedResponse),
                            jobPosition: jobPosition,
                            jobDesc: jobDescription,
                            jobExperience: jobExperience,
                            createdBy: user?.primaryEmailAddress?.emailAddress,
                            createdAt: moment().format('DD-MM-YYYY')
                        });
    
                        setOpenDialog(false);
                        router.push(`/dashboard/interview/${mockId}`);
                    } catch (dbError) {
                        console.error('Database insertion error:', dbError.message || dbError);
                        setError('Failed to insert record into the database. Please try again.');
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    setError('Failed to parse the response. Please try again.');
                }
            } else {
                console.log("Error: Result is empty");
                setError('Failed to get a response from the AI. Please try again.');
            }
        } catch (error) {
            console.error('Error generating interview questions and answers:', error);
            setError('An error occurred while generating interview questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className='p-4 border rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-center transition-all' onClick={() => setOpenDialog(true)}>
                    <h2 className='text-lg font-semibold'>+ Add New</h2>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold mb-4">Tell us more about your job interview</DialogTitle>
                            <DialogDescription asChild>
                                <div className='space-y-4'>
                                    <div className='my-3'>
                                        <label className="block mb-2 text-sm font-medium">Job Role/Job Position</label>
                                        <Input placeholder='Ex. Full Stack Developer, Software Developer' required className="w-full p-2 border rounded" value={jobPosition} onChange={(event) => setJobPosition(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label className="block mb-2 text-sm font-medium">Job Description/Tech Stack (In Short)</label>
                                        <TextareaAutosize placeholder='Ex. Angular, React, Node.js, MySQL etc.' required className="w-full p-2 border rounded font-semibold" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label className="block mb-2 text-sm font-medium">Years of experience</label>
                                        <Input placeholder='Ex. 5' type="number" required className="w-full p-2 border rounded" value={jobExperience} onChange={(event) => setJobExperience(event.target.value)} />
                                    </div>
                                    {error && <div className='text-red-500'>{error}</div>}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex gap-4 justify-end mt-6'>
                            <Button type="button" variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading} variant="contained" color="primary" onClick={onSubmit}>
                                {loading ? <span>Generating from AI....</span> : 'Start Interview'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </form>
    );
}

export default AddNewInterview;
