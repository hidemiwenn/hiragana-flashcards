
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FlashcardProps {
  text: string;
  onNext: () => void;
  onPrev: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ text, onNext, onPrev }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <button 
        onClick={onPrev}
        className="p-4 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Previous flashcard"
      >
        <ArrowLeft size={32} />
      </button>
      
      <div className="flex-1 max-w-md flex items-center justify-center">
        <div className="w-full aspect-[4/3] bg-white rounded-xl shadow-lg flex items-center justify-center p-6 select-none">
          <p className="text-7xl font-medium text-center">{text}</p>
        </div>
      </div>
      
      <button 
        onClick={onNext}
        className="p-4 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Next flashcard"
      >
        <ArrowRight size={32} />
      </button>
    </div>
  );
};

export default Flashcard;
