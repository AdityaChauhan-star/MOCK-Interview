import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CalendarIcon, ClockIcon } from 'lucide-react';

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };
  
  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-blue-600 mb-1">{interview?.jobPosition}</h3>
            <p className="text-sm text-gray-600">{interview?.jobExperience} Years Experience</p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {interview?.status || 'New'}
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-xs mb-4">
          <CalendarIcon className="w-3 h-3 mr-1" />
          <span>{formatDate(interview.createdAt)}</span>
        </div>
        
        <div className="flex justify-between gap-3 mt-4">
          <Button 
            onClick={onFeedback} 
            size="sm" 
            variant="outline" 
            className="w-full font-medium"
          >
            View Feedback
          </Button>
          <Button 
            onClick={onStart} 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700 font-medium"
          >
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;