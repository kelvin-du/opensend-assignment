import Button from "@/common/components/Button";
import Input from "@/common/components/Input";
import { useFormContext } from "react-hook-form";
import { NewWidgetFormFields } from ".";
import { getWidgetTypeDisplayValue } from "../../utils";
import FormTitle from "./FormTitle";

export default function WidgetInfoForm({
  handleBack,
  handleSubmit,
}: {
  handleBack: () => void;
  handleSubmit: () => void;
}) {
  const {
    register,
    getValues,
    formState: { errors, dirtyFields },
  } = useFormContext<NewWidgetFormFields>();

  const isAddButtonDisabled =
    !!errors.title ||
    !!errors.description ||
    !dirtyFields.title ||
    !dirtyFields.description;

  return (
    <>
      <FormTitle
        title="Configure widget"
        description="Add a title and select data to display on the overview page"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
        <div className="col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-4">
            <div className="text-neutral-500 dark:text-gray-300 font-semibold text-sm">
              Value
            </div>
            <div className="text-2xl font-bold dark:text-gray-50">0</div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-4">
            <div className="text-gray-500 dark:text-gray-300 font-semibold">
              Widget type
            </div>
            <div className="dark:text-gray-50">
              {getWidgetTypeDisplayValue(getValues("widgetType"))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-gray-50 rounded-md p-6 flex flex-col gap-4">
            <div>
              <label>Title</label>
              <Input {...register("title")} />
            </div>

            <div>
              <label>Description</label>
              <Input {...register("description")} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 sm:pt-8 md:pt-12">
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isAddButtonDisabled}>
          Add
        </Button>
      </div>
    </>
  );
}
