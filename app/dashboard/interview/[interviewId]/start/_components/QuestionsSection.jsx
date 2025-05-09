import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      } else {
        alert("No text provided for speech synthesis.");
      }
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestions && (
      <div className="flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
          {mockInterviewQuestions.map((question, index) => (
            <div
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index ? "bg-primary text-white" : "bg-secondary"
              }`}
              onClick={() => console.log(`Question ${index + 1} clicked`)}
            >
              <h2 className="p-2">{`Question #${index + 1}`}</h2>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start w-full mt-5">
          <h2 className="text-md md:text-lg font-semibold my-5">
            {mockInterviewQuestions[activeQuestionIndex]?.question}
          </h2>
          <Volume2
            className="cursor-pointer"
            onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}
          />
          <div className="border rounded-lg p-5 bg-blue-100 mt-5 flex flex-col items-start">
            <h2 className="flex gap-2 items-center text-primary font-semibold">
              <Lightbulb />
              <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-primary my-2">
              {process.env.NEXT_PUBLIC_QUESTION_NOTE || "For questions related to tech stacks, try to explain each component clearly and briefly with its specific role."}
            </h2>
          </div>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
