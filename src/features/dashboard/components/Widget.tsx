import { cx } from "@/common/utils/styles";
import {
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  TouchEvent,
  useState,
} from "react";
import { WidgetInfo } from "../types";
import { getWidgetTypeDisplayValue } from "../utils";
import { EditIcon } from "lucide-react";
import Dialog from "@/common/components/Dialog";
import WidgetForm from "./WidgetForm";

type WidgetProps = HTMLAttributes<HTMLDivElement> & {
  widgetInfo: WidgetInfo;
};

export default function Widget({
  className,
  widgetInfo,
  ...props
}: WidgetProps) {
  const [open, setOpen] = useState(false);

  const handleCancelEdit = () => setOpen(false);

  const cancelDraggingEvent = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); // to prevent triggering the widget dragging behavior
  };

  const handleEdit: MouseEventHandler<HTMLButtonElement> = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className={cx(
          "p-2 md:p-4 rounded-md cursor-grab h-full overflow-hidden",
          "bg-gray-200 dark:bg-gray-700 dark:text-gray-200",
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-center border-b border-gray-400 pb-2">
          <h1 className="text-sm">
            {getWidgetTypeDisplayValue(widgetInfo.type)}
          </h1>
          <button
            onMouseDown={cancelDraggingEvent}
            onTouchStartCapture={cancelDraggingEvent}
            onClick={handleEdit}
            className="cursor-pointer -m-2 p-2"
          >
            <EditIcon size={14} />
          </button>
        </div>
        <h1 className="text-md font-bold pt-2">{widgetInfo.title}</h1>
        <p className="text-sm">{widgetInfo.description}</p>
      </div>
      <Dialog
        open={open}
        onClose={handleCancelEdit}
        containerClassName="rounded-md w-full md:w-[85%] lg:w-[65%] max-w-[90vw] md:max-w-[72rem] max-h-[90vh] overflow-y-auto"
      >
        <WidgetForm editingWidget={widgetInfo} onCancel={handleCancelEdit} />
      </Dialog>
    </>
  );
}
