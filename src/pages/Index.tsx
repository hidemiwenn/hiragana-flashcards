
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
    nextFlashcard,
    prevFlashcard,
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
    <div className="h-[100vh] flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Header */}
      <header className="p-1 sm:p-2 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          ひらがなふらっしゅかーど
        </h1>
        <Button
          variant="ghost"
          onClick={handleOpenEditModal}
          className="text-xl p-1 sm:p-2"
          aria-label="Edit flashcards"
        >
          ⋯
        </Button>
      </header>

      {/* Flashcard Container */}
      <main className="flex-1 flex items-center justify-center py-1 px-2 overflow-hidden">
        {currentFlashcard ? (
          <Flashcard
            text={currentFlashcard.text}
            onNext={nextFlashcard}
            onPrev={prevFlashcard}
          />
        ) : (
          <div className="text-center p-4 sm:p-8 bg-white rounded-xl shadow-md">
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
