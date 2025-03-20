import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { WIDGET_TYPES } from "../../constants";
import WidgetInfoForm from "./WidgetInfoForm";
import WidgetTypeSelectionForm from "./WidgetTypeSelectionForm";
import { useAppDispatch } from "@/redux/hooks";
import { dashboardSlice } from "../../slice";

type NewWidgetFormProps = {
  onCancel: () => void;
};

const newWidgetFormSchema = z.object({
  widgetType: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type NewWidgetFormFields = z.infer<typeof newWidgetFormSchema>;

export default function NewWidgetForm({ onCancel }: NewWidgetFormProps) {
  const [step, setStep] = useState<"overview" | "info">("overview");

  const dispatch = useAppDispatch();

  const form = useForm<NewWidgetFormFields>({
    defaultValues: {
      widgetType: WIDGET_TYPES[0].id,
      title: "",
      description: "",
    },
    mode: "onChange",
    resolver: zodResolver(newWidgetFormSchema),
  });

  const handleNext = () => {
    setStep("info");
  };

  const handleBack = () => {
    setStep("overview");
  };

  const handleAddWidget = () => {
    const newWidget = {
      type: form.getValues("widgetType"),
      title: form.getValues("title"),
      description: form.getValues("description"),
    };
    dispatch(dashboardSlice.actions.addNewWidget(newWidget));
    onCancel();
  };

  return (
    <FormProvider {...form}>
      <div className="px-4 py-6 xs:p-10 md:p-14 bg-neutral-200 dark:bg-gray-700 rounded-md">
        {step === "overview" && (
          <WidgetTypeSelectionForm
            handleCancel={onCancel}
            handleNext={handleNext}
          />
        )}
        {step === "info" && (
          <WidgetInfoForm
            handleBack={handleBack}
            handleSubmit={handleAddWidget}
          />
        )}
      </div>
    </FormProvider>
  );
}
