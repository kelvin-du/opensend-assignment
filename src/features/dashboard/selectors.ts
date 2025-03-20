import { RootState } from "@/redux/types";

export const selectWidgets = (state: RootState) => state.dashboard.widgets;

export const selectLayouts = (state: RootState) => state.dashboard.layouts;
