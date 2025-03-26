import Button from "@/common/components/Button";
import Input from "@/common/components/Input";
import { useFormContext } from "react-hook-form";
import { getWidgetTypeDisplayValue } from "../../utils";
import FormTitle from "../WidgetFormLayout/FormTitle";
import FormFooter from "../WidgetFormLayout/FormFooter";
import { WidgetFormFields } from ".";
import FormBody from "../WidgetFormLayout/FormBody";

export default function WidgetInfoForm({
  handleBack,
  handleSubmit,
}: {
  handleBack: () => void;
  handleSubmit: () => void;
}) {
  const { register, getValues, formState } = useFormContext<WidgetFormFields>();

  const isEditing = !!getValues("id");
  const isAddButtonDisabled = !formState.isValid;

  return (
    <>
      <FormTitle
        title={isEditing ? "Editing: Configure widget" : "Configure widget"}
        description="Add a title and select data to display on the overview page"
      />
      <FormBody>
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-4">
            <div className="text-neutral-500 dark:text-gray-300 font-semibold text-sm">
              Value
            </div>
            <div className="text-2xl font-bold dark:text-gray-50">0</div>
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-md px-6 py-4">
            <div className="text-gray-500 dark:text-gray-300 font-semibold">
              Widget type
            </div>
            <div className="dark:text-gray-50">
              {getWidgetTypeDisplayValue(getValues("type"))}
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
      </FormBody>

      <FormFooter>
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isAddButtonDisabled}>
          Add
        </Button>
      </FormFooter>
    </>
  );
}
