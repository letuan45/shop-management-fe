import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  description: string;
  isOpen: boolean;
  isLoading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  description,
  isOpen,
  isLoading,
  setIsOpen,
  onConfirm,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắc hành động này?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            type="submit"
            className="!bg-slate-500"
          >
            Hủy
          </Button>
          <Button type="submit" onClick={onConfirm}>
            {isLoading ? <ReloadIcon className="animate-spin" /> : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
