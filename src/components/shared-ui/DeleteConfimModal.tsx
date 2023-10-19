import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import DeleteBtn from "./DeleteBtn";

interface DeleteConfimModalProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
}

const DeleteConfimModal = ({
  title,
  description,
  onConfirm,
}: DeleteConfimModalProps) => {
  const [open, setOpen] = useState(false);

  const confirmClickHandler = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <div className="flex justify-end">
          <DeleteBtn onClick={confirmClickHandler} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfimModal;
