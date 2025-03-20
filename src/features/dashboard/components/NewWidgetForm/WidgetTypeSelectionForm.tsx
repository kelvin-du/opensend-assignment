import { useFormContext } from "react-hook-form";
import FormTitle from "./FormTitle";
import { NewWidgetFormFields } from ".";
import { WIDGET_TYPES } from "../../constants";
import Button from "@/common/components/Button";

export default function WidgetTypeSelectionForm({
  handleCancel,
  handleNext,
}: {
  handleCancel: () => void;
  handleNext: () => void;
}) {
  const { register } = useFormContext<NewWidgetFormFields>();

  return (
    <>
      <FormTitle
        title="Overview"
        description="Select a widget type to add to the overview page"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        {WIDGET_TYPES.map((widgetType) => (
          <label
            key={widgetType.id}
            className="flex flex-col items-stretch cursor-pointer"
          >
            <input
              type="radio"
              value={widgetType.id}
              className="peer hidden"
              {...register("widgetType")}
            />
            <div className="bg-neutral-50 dark:bg-gray-500 border-2 p-4 sm:p-6 border-gray-400 peer-checked:border-primary rounded-md flex flex-col items-center gap-2">
              <div className="w-[72px] sm:w-[120px] aspect-square border border-gray-400 flex items-center justify-center">
                <widgetType.Icon
                  className="text-gray-500 dark:text-gray-200"
                  size={46}
                />
              </div>
              <span className="text-center pt-2 text-sm sm:text-md dark:text-gray-200">
                {widgetType.name}
              </span>
            </div>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 sm:pt-8 md:pt-12">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </>
  );
}
