import { useFormContext } from "react-hook-form";
import FormTitle from "../WidgetFormLayout/FormTitle";
import { WIDGET_TYPES } from "../../constants";
import Button from "@/common/components/Button";
import FormFooter from "../WidgetFormLayout/FormFooter";
import { WidgetFormFields } from ".";
import FormBody from "../WidgetFormLayout/FormBody";

export default function WidgetTypeSelectionForm({
  handleCancel,
  handleNext,
}: {
  handleCancel: () => void;
  handleNext: () => void;
}) {
  const { register, getValues } = useFormContext<WidgetFormFields>();

  const isEditing = !!getValues("id");

  return (
    <>
      <FormTitle
        title={isEditing ? "Editing: Overview" : "Overview"}
        description="Select a widget type to add to the overview page"
      />
      <FormBody className="grid-cols-2">
        {WIDGET_TYPES.map((widgetType) => (
          <label
            key={widgetType.id}
            className="flex flex-col items-stretch cursor-pointer"
          >
            <input
              type="radio"
              value={widgetType.id}
              className="peer hidden"
              {...register("type")}
            />
            <div className="bg-neutral-50 dark:bg-gray-800 border-2 p-4 sm:p-6 border-gray-400 peer-checked:border-primary rounded-md flex flex-col items-center gap-2">
              <div className="w-[72px] sm:w-[120px] aspect-square border border-gray-400 flex items-center justify-center">
                <widgetType.Icon
                  className="text-gray-500 dark:text-gray-100"
                  size={46}
                />
              </div>
              <span className="text-center pt-2 text-sm sm:text-md dark:text-gray-100">
                {widgetType.name}
              </span>
            </div>
          </label>
        ))}
      </FormBody>
      <FormFooter>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </FormFooter>
    </>
  );
}
