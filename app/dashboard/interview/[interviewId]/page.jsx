"use client";
import React, { useEffect, useState } from "react";
import db from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { useParams, notFound } from 'next/navigation';

function Interview() {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false); // Added webCamEnabled state
    const { interviewId } = useParams();

    useEffect(() => {
        console.log("Fetched params:", interviewId); // Log the extracted interviewId
        if (interviewId) {
            GetInterviewDetails(interviewId);
        }
    }, [interviewId]);

    const GetInterviewDetails = async (interviewId) => {
        console.log("Fetching interview details for ID:", interviewId);

        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where((mockInterview) => mockInterview.mockId === interviewId)
                .execute();

            console.log("Fetched interview result:", result);

            if (result.length === 0) {
                notFound(); // Redirect to 404 if no interview found
            } else {
                const interview = result.find((item) => item.mockId === interviewId);

                if (!interview) {
                    notFound(); // Redirect to 404 if no matching interview found
                } else {
                    setInterviewData(interview);
                    console.log("Interview data:", interview);
                }
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
            notFound(); // Redirect to 404 if error occurs
        }
    };

    const handleEnableWebCam = async () => {
        try {
            console.log("Requesting webcam and microphone access");
            await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("Webcam and microphone access granted");
            setWebCamEnabled(true);
        } catch (error) {
            console.error("Error enabling webcam:", error);
            setWebCamEnabled(false);
        }
    };

    if (!interviewData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    <div className="flex flex-col p-5 gap-5 rounded-lg border">
                        <h2 className="text-lg">
                            <strong>Job Role/Job Position: </strong>
                            {interviewData.jobPosition}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Job Description/Tech Stack: </strong>
                            {interviewData.jobDesc}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Years of Experience: </strong>
                            {interviewData.jobExperience}
                        </h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-yellow-500">
                            <Lightbulb />
                            <strong>Information</strong>
                        </h2>

                        <h2 className="mt-3">
                            Please answer the upcoming questions as naturally and honestly as you would in a real interview.
                            The AI interviewer will adapt its questions based on your responses.
                        </h2>

                        <h2 className="mt-3">
                            ⚠️ <strong>Reminder:</strong> Ensure your <strong>Webcam</strong> and <strong>Microphone</strong> are enabled before starting the interview.
                        </h2>

                        {process.env.NEXT_PUBLIC_INFORMATION && (
                            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                        )}
                    </div>

                </div>
                <div>
                    {webCamEnabled ? (
                        <Webcam
                            audio={true}
                            videoConstraints={{
                                width: 300,
                                height: 300,
                                facingMode: "user",
                            }}
                            mirrored={true}
                        />
                    ) : (
                        <div className="h-72 w-full my-7 p-20 bg-secondary rounded-e-lg border" />
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEnableWebCam}
                    >
                        Enable Web Cam and Microphone
                    </Button>
                </div>
            </div>
            <div className="flex justify-end items-end mt-5">
                <Link href={`/dashboard/interview/${interviewId}/start`}>
                    <Button variant="contained" color="primary">
                        Start Interview
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
