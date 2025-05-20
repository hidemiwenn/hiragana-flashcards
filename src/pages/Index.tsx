
import React, { useState, useEffect } from "react";
import Flashcard from "@/components/Flashcard";
import EditModal from "@/components/EditModal";
import { useFlashcards } from "@/hooks/useFlashcards";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const {
    flashcards,
    currentFlashcard,
    showRandomFlashcard,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    saveFlashcards
  } = useFlashcards();

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore) {
      setShowWelcome(true);
      localStorage.setItem("hasVisitedBefore", "true");
      
      // Hide welcome message after 3 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = () => {
    saveFlashcards(flashcards);
    toast("Flashcards saved successfully!");
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <div className="h-[100vh] flex flex-col bg-white overflow-hidden">
      {/* Edit Button (Top Right) */}
      <div className="absolute top-0 right-0 z-10 p-2">
        <Button
          variant="ghost"
          onClick={handleOpenEditModal}
          className="text-xl p-2"
          aria-label="Edit flashcards"
        >
          ⋯
        </Button>
      </div>

      {/* Flashcard Container */}
      <main className="flex-1 flex items-center justify-center overflow-hidden">
        {showWelcome && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-20"
            onClick={handleDismissWelcome}
          >
            <p className="text-4xl text-gray-800">タップしてカードをめくろう</p>
          </div>
        )}
        
        {currentFlashcard ? (
          <Flashcard
            text={currentFlashcard.text}
            onRandomCard={showRandomFlashcard}
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-lg text-gray-600 mb-4">
              カードがないよ。ボタンをおしてつくってみよう！
            </p>
            <Button onClick={handleOpenEditModal}>カードをつくる</Button>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        flashcards={flashcards}
        onUpdate={updateFlashcard}
        onDelete={deleteFlashcard}
        onAdd={addFlashcard}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;
