
import React, { useState } from "react";
import { Flashcard } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FlashcardsListProps {
  flashcards: Flashcard[];
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string) => void;
}

const FlashcardsList: React.FC<FlashcardsListProps> = ({ 
  flashcards, 
  onUpdate, 
  onDelete, 
  onAdd 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [newText, setNewText] = useState<string>("");

  const handleEditClick = (card: Flashcard) => {
    setEditingId(card.id);
    setEditText(card.text);
  };

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      onUpdate(editingId, editText);
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  const handleAddNew = () => {
    if (newText.trim()) {
      onAdd(newText);
      setNewText("");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-h-[60vh] overflow-y-auto px-1">
      {flashcards.map((card) => (
        <div key={card.id} className="flex items-center gap-2 w-full">
          {editingId === card.id ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 text-lg"
            />
          ) : (
            <div 
              onClick={() => handleEditClick(card)}
              className="flex-1 p-4 bg-white rounded-md border text-lg cursor-pointer"
            >
              {card.text}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(card.id)}
            aria-label="Delete flashcard"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ))}
      
      <div className="flex items-center gap-2 mt-2">
        <Input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add new flashcard"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleAddNew()}
        />
        <Button 
          onClick={handleAddNew}
          className="flex-grow-0"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default FlashcardsList;
