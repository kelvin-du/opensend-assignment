import Button from "@/common/components/Button";
import Dialog from "@/common/components/Dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import NewWidgetForm from "./NewWidgetForm";

export function NewWidgetButton() {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <PlusIcon size={18} />
        New
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        containerClassName="rounded-md w-full lg:w-[65%] max-w-[90vw] md:max-w-[72rem] max-h-[90vh] overflow-y-auto"
      >
        <NewWidgetForm onCancel={handleCancel} />
      </Dialog>
    </>
  );
}
