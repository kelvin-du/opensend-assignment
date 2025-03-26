import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { cx } from "../utils/styles";

type DialogProps = PropsWithChildren & {
  containerClassName?: string;
  open: boolean;
  onClose: () => void;
};

export default function Dialog({
  open,
  onClose,
  children,
  containerClassName,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [localOpen, setLocalOpen] = useState(open);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (open) {
      setLocalOpen(true);
      dialogRef.current.showModal();
    } else {
      setLocalOpen(false);
      dialogRef.current.close();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      setLocalOpen(false);
    };
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStartCapture={(e) => e.stopPropagation()}
      onClick={handleBackdropClick}
      onClose={onClose}
      className={cx(
        "w-[100dvw] h-[100dvh] bg-transparent",
        "backdrop:bg-gray-800/75 dark:backdrop:bg-gray-900/75",
        {
          "flex items-center justify-center": localOpen,
        }
      )}
    >
      <div
        className={cx("fixed -translate-x-1/2 left-1/2", containerClassName)}
      >
        {open && children}
      </div>
    </dialog>
  );
}
