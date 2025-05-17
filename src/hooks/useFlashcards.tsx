
import { useState, useEffect } from "react";
import { Flashcard, initialFlashcards } from "@/lib/sample-data";

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // Load flashcards from sessionStorage or use initial data
    const savedFlashcards = sessionStorage.getItem("flashcards");
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
    } else {
      setFlashcards(initialFlashcards);
    }
    
    // Set a random flashcard on initial load
    if (initialFlashcards.length > 0) {
      const randomIndex = Math.floor(Math.random() * initialFlashcards.length);
      setCurrentIndex(randomIndex);
    }
  }, []);

  const saveFlashcards = (cards: Flashcard[]) => {
    setFlashcards(cards);
    sessionStorage.setItem("flashcards", JSON.stringify(cards));
  };

  const showRandomFlashcard = () => {
    if (flashcards.length <= 1) return;
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * flashcards.length);
    } while (newIndex === currentIndex && flashcards.length > 1);
    
    setCurrentIndex(newIndex);
  };

  const addFlashcard = (text: string) => {
    const newFlashcard: Flashcard = {
      id: Date.now().toString(),
      text
    };
    const updatedFlashcards = [...flashcards, newFlashcard];
    saveFlashcards(updatedFlashcards);
  };

  const updateFlashcard = (id: string, text: string) => {
    const updatedFlashcards = flashcards.map(card => 
      card.id === id ? { ...card, text } : card
    );
    saveFlashcards(updatedFlashcards);
  };

  const deleteFlashcard = (id: string) => {
    const updatedFlashcards = flashcards.filter(card => card.id !== id);
    saveFlashcards(updatedFlashcards);
    
    // Adjust currentIndex if needed
    if (currentIndex >= updatedFlashcards.length) {
      setCurrentIndex(Math.max(0, updatedFlashcards.length - 1));
    }
  };

  const nextFlashcard = () => {
    if (flashcards.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    if (flashcards.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  return {
    flashcards,
    currentFlashcard: flashcards[currentIndex],
    currentIndex,
    nextFlashcard,
    prevFlashcard,
    showRandomFlashcard,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    saveFlashcards,
  };
}
