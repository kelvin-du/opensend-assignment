import { Responsive, ResponsiveProps, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import { cx } from "@/common/utils/styles";
import styles from "./WidgetBoard.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectLayouts, selectWidgets } from "../selectors";
import { dashboardSlice } from "../slice";

const ResponsiveGridLayout = WidthProvider(Responsive);

export function WidgetBoard() {
  const widgets = useAppSelector(selectWidgets);
  const layouts = useAppSelector(selectLayouts);
  const dispatch = useAppDispatch();

  return (
    <ResponsiveGridLayout
      className={cx(
        "border border-gray-300 rounded-md min-h-[100px]",
        styles["widget-board"]
      )}
      layouts={layouts}
      rowHeight={80}
      breakpoints={defaultBreakpoints}
      cols={defaultCols}
      margin={defaultMargin}
      useCSSTransforms
      onLayoutChange={(_currentLayout, allLayouts) => {
        dispatch(dashboardSlice.actions.updateLayouts(allLayouts));
      }}
    >
      {widgets.map((widgetInfo) => (
        <div key={widgetInfo.id}>
          <Widget key={widgetInfo.id} widgetInfo={widgetInfo} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

const defaultBreakpoints: ResponsiveProps["breakpoints"] = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 544,
  xxs: 0,
};

const defaultCols: ResponsiveProps["cols"] = {
  lg: 12,
  md: 8,
  sm: 6,
  xs: 4,
  xxs: 2,
};

const defaultMargin: ResponsiveProps["margin"] = {
  lg: [8, 8],
  md: [8, 8],
  sm: [6, 6],
  xs: [6, 6],
  xxs: [4, 4],
};
