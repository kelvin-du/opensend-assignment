import { cx } from "@/common/utils/styles";
import { PropsWithChildren } from "react";

type FormBodyProps = PropsWithChildren & {
  className?: string;
};

export default function FormBody({ children, className }: FormBodyProps) {
  return (
    <div
      className={cx(
        "grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
