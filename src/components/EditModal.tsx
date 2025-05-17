
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FlashcardsList from "./FlashcardsList";
import { Flashcard } from "@/lib/sample-data";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  flashcards: Flashcard[];
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string) => void;
  onSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  flashcards,
  onUpdate,
  onDelete,
  onAdd,
  onSave
}) => {
  const handleSaveAndClose = () => {
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>カードをかえる</DialogTitle>
        </DialogHeader>
        <FlashcardsList
          flashcards={flashcards}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onAdd={onAdd}
        />
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleSaveAndClose}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800"
          >
            保存する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
