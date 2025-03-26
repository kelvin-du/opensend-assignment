import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { WIDGET_TYPES } from "../../constants";
import { dashboardSlice } from "../../slice";
import { WidgetInfo } from "../../types";
import WidgetInfoForm from "./WidgetInfoForm";
import WidgetTypeSelectionForm from "./WidgetTypeSelectionForm";

type WidgetFormProps = {
  editingWidget?: WidgetInfo | null;
  onCancel: () => void;
};

const widgetFormSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type WidgetFormFields = z.infer<typeof widgetFormSchema>;

export default function WidgetForm({
  editingWidget,
  onCancel,
}: WidgetFormProps) {
  const [step, setStep] = useState<"overview" | "info">("overview");

  const dispatch = useAppDispatch();

  const form = useForm<WidgetFormFields>({
    values: editingWidget ?? undefined,
    defaultValues: {
      type: WIDGET_TYPES[0].id,
      title: "",
      description: "",
    },
    mode: "onChange",
    resolver: zodResolver(widgetFormSchema),
  });

  const handleNext = () => {
    if (!editingWidget) {
      form.trigger();
    }
    setStep("info");
  };

  const handleBack = () => {
    if (!editingWidget) {
      form.trigger();
    }
    setStep("overview");
  };

  const handleSubmit = () => {
    const widgetInfo = {
      id: form.getValues("id"),
      type: form.getValues("type"),
      title: form.getValues("title"),
      description: form.getValues("description"),
    };
    if (!widgetInfo.id) {
      dispatch(dashboardSlice.actions.addNewWidget(widgetInfo));
    } else {
      dispatch(dashboardSlice.actions.editWidget(widgetInfo as WidgetInfo));
    }
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
          <WidgetInfoForm handleBack={handleBack} handleSubmit={handleSubmit} />
        )}
      </div>
    </FormProvider>
  );
}
