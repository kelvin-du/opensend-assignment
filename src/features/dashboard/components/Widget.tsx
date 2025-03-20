import { cx } from "@/common/utils/styles";
import { HTMLAttributes } from "react";
import { WidgetInfo } from "../types";
import { getWidgetTypeDisplayValue } from "../utils";

type WidgetProps = HTMLAttributes<HTMLDivElement> & {
  widgetInfo: WidgetInfo;
};

export default function Widget({
  className,
  widgetInfo,
  ...props
}: WidgetProps) {
  return (
    <div
      className={cx(
        "p-4 rounded-md cursor-grab h-full overflow-hidden",
        "bg-gray-200 dark:bg-gray-700 dark:text-gray-200",
        className
      )}
      {...props}
    >
      <h1 className="border-b border-gray-400 pb-2 text-sm">
        {getWidgetTypeDisplayValue(widgetInfo.type)}
      </h1>
      <h1 className="text-md font-bold pt-2">{widgetInfo.title}</h1>
      <p className="text-sm">{widgetInfo.description}</p>
    </div>
  );
}
