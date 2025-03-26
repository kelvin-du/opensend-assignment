import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetInfo } from "./types";
import { generateUuid } from "@/common/utils/uuid";
import { getInitialLayout } from "./utils";

type DashboardState = {
  layouts: ReactGridLayout.Layouts;
  widgets: WidgetInfo[];
};

const initialState: DashboardState = {
  layouts: {},
  widgets: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addNewWidget: (state, action: PayloadAction<Omit<WidgetInfo, "id">>) => {
      const newWidget = { ...action.payload, id: generateUuid() };
      const layoutForNewWidget = getInitialLayout(newWidget);
      state.widgets.push(newWidget);

      Object.keys(layoutForNewWidget).forEach((targetBreakpoint) => {
        const newLayout =
          layoutForNewWidget[
            targetBreakpoint as keyof typeof layoutForNewWidget
          ];

        if (!state.layouts[targetBreakpoint]) {
          state.layouts[targetBreakpoint] = [];
        }
        // find existing layout for the new widget
        const existingLayoutIndex = state.layouts[targetBreakpoint].findIndex(
          (targetLayout) => targetLayout.i === newLayout.i
        );
        if (existingLayoutIndex >= 0) {
          state.layouts[targetBreakpoint][existingLayoutIndex] = newLayout;
        } else {
          state.layouts[targetBreakpoint].push(newLayout);
        }
      });
    },
    editWidget: (state, action: PayloadAction<WidgetInfo>) => {
      const editingWidget = action.payload;
      const targetWidget = state.widgets.find((w) => w.id === editingWidget.id);
      if (!targetWidget) {
        return;
      }
      targetWidget.type = editingWidget.type;
      targetWidget.title = editingWidget.title;
      targetWidget.description = editingWidget.description;
    },
    updateLayouts: (state, action: PayloadAction<ReactGridLayout.Layouts>) => {
      state.layouts = action.payload;
    },
    reset: () => initialState,
  },
});
