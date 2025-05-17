
import React from "react";

interface FlashcardProps {
  text: string;
  onRandomCard: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ text, onRandomCard }) => {
  return (
    <div 
      className="w-full h-full flex items-center justify-center cursor-pointer"
      onClick={onRandomCard}
      aria-label="Show random flashcard"
    >
      <p className="text-8xl font-medium text-center py-24">{text}</p>
    </div>
  );
};

export default Flashcard;
