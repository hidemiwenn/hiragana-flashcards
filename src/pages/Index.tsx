
import React, { useState } from "react";
import Flashcard from "@/components/Flashcard";
import EditModal from "@/components/EditModal";
import { useFlashcards } from "@/hooks/useFlashcards";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    flashcards,
    currentFlashcard,
    showRandomFlashcard,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    saveFlashcards
  } = useFlashcards();

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
        {currentFlashcard ? (
          <Flashcard
            text={currentFlashcard.text}
            onRandomCard={showRandomFlashcard}
          />
        ) : (
          <div className="text-center p-8">
            <p className="text-lg text-gray-600 mb-4">
              No flashcards available. Click the ⋯ button to add some!
            </p>
            <Button onClick={handleOpenEditModal}>Add Flashcards</Button>
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
