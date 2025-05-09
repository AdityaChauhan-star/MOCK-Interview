'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef, createContext } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { sendMessage } from "@/utils/GeminiAIModal"; // Correct import
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define WebCamContext
const WebCamContext = createContext();

const RecordAnswerSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      if (!interviewData?.mockId) {
        throw new Error("MockId is null or undefined.");
      }
      setLoading(true);
      console.log("Preparing feedback prompt...");
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestions[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      console.log("Sending feedback prompt to AI model...");
      const result = await sendMessage(feedbackPrompt); // Use the imported sendMessage function
      console.log("Received AI model response:", result);
      let MockJsonResp = result.replace("```json", "").replace("```", "");

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        throw new Error("Invalid JSON response: " + MockJsonResp);
      }

      console.log("Inserting user answer into database...");
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId, // Corrected field name
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
      } else {
        toast("Failed to record user answer");
      }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error("Error recording user answer:", error);
      toast(`An error occurred while recording the user answer: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-black mt-4 w-[30rem] ">
          {webCamEnabled ? (
            <Webcam
              mirrored={true}
              style={{ height: 250, width: "100%", zIndex: 10 }}
            />
          ) : (
            <Image src={"/webcam.png"} width={200} height={200} alt="Camera placeholder" />
          )}
        </div>
        <div className="md:flex mt-4 md:mt-8 md:gap-5">
          <div className="my-4 md:my-0">
            <Button onClick={() => setWebCamEnabled((prev) => !prev)}>
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
          >
            {isRecording ? (
              <h2 className="text-red-400 flex gap-2 ">
                <Mic /> Stop Recording...
              </h2>
            ) : (
              " Record Answer"
            )}
          </Button>
        </div>
      </div>
    </WebCamContext.Provider>
  );
};

export default RecordAnswerSection;
