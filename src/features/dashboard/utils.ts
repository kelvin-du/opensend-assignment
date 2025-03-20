import { WIDGET_TYPES } from "./constants";
import { WidgetInfo } from "./types";

export const getInitialLayout = (widget: WidgetInfo) => {
  const fixedConfig = {
    i: widget.id,
    minW: 2,
    minH: 2,
  };
  return {
    lg: {
      w: 3,
      h: 3,
      x: 0,
      y: 0,
      ...fixedConfig,
    },
    xxs: {
      w: 2,
      h: 2,
      x: 0,
      y: 0,
      ...fixedConfig,
    },
  };
};

export const getWidgetTypeDisplayValue = (widgetTypeId: string) => {
  return WIDGET_TYPES.find((type) => type.id === widgetTypeId)?.name || "";
};
