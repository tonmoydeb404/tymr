import { useDeleteWorkTime } from "@/database/hooks";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  onClose: () => void;
  id: string | null;
};

const TimeDeleteModal = (props: Props) => {
  const { id, onClose } = props;

  const remove = useDeleteWorkTime({
    onSuccess: () => {
      toast.success("Time track deleted");
      onClose();
    },
    onError: () => {
      toast.error("Failed to delete time track");
    },
  });

  return (
    <AlertDialog open={!!id}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your time
            tracking
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => (id ? remove.trigger(id) : {})}
            disabled={remove.isMutating}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TimeDeleteModal;
