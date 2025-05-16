
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FlashcardProps {
  text: string;
  onNext: () => void;
  onPrev: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ text, onNext, onPrev }) => {
  return (
    <div className="flex items-center justify-center w-full h-full max-h-full">
      <button 
        onClick={onPrev}
        className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Previous flashcard"
      >
        <ArrowLeft size={24} />
      </button>
      
      <div className="flex-1 max-w-md flex items-center justify-center px-1">
        <div className="w-full h-full bg-white rounded-xl shadow-lg flex items-center justify-center p-2 select-none" style={{ maxHeight: "90%" }}>
          <p className="text-5xl font-medium text-center py-6 card-text">{text}</p>
        </div>
      </div>
      
      <button 
        onClick={onNext}
        className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Next flashcard"
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default Flashcard;
