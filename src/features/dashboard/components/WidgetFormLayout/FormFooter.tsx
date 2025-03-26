import { cx } from "@/common/utils/styles";
import { PropsWithChildren } from "react";

type FormFooterProps = PropsWithChildren & {
  className?: string;
};

export default function FormFooter({ children, className }: FormFooterProps) {
  return (
    <div
      className={cx("grid grid-cols-2 gap-4 pt-4 sm:pt-8 md:pt-12", className)}
    >
      {children}
    </div>
  );
}
