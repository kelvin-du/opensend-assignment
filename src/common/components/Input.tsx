import { InputHTMLAttributes, PropsWithChildren, ReactNode, Ref } from "react";
import { cx } from "@/common/utils/styles";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "suffix"
> & {
  ref?: Ref<HTMLInputElement>;
  containerClassName?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  errorMessage?: string | undefined | null;
};

export default function Input({
  className,
  containerClassName,
  prefix,
  suffix,
  errorMessage,
  ...inputProps
}: InputProps) {
  return (
    <>
      <InputContainer
        className={containerClassName}
        prefix={prefix}
        suffix={suffix}
        errorMessage={errorMessage}
      >
        <input
          {...inputProps}
          className={cx(
            "w-full py-3 text-gray-800 dark:text-gray-200 outline-hidden placeholder:italic focus-visible:outline-hidden",
            {
              "text-gray-500 dark:text-gray-400": inputProps.disabled,
            },
            className
          )}
        />
      </InputContainer>
    </>
  );
}

type InputContainerProps = PropsWithChildren & {
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  errorMessage?: string | undefined | null;
};

function InputContainer({
  children,
  className,
  prefix,
  suffix,
  errorMessage,
}: InputContainerProps) {
  let gridTemplateClass = "grid-cols-1";

  if (prefix && suffix) {
    gridTemplateClass = "grid-cols-[auto_1fr_auto]";
  } else if (prefix && !suffix) {
    gridTemplateClass = "grid-cols-[auto_1fr]";
  } else if (!prefix && suffix) {
    gridTemplateClass = "grid-cols-[1fr_auto]";
  }

  return (
    <div className="flex flex-col gap-1 items-start">
      <div
        className={cx(
          "relative rounded-md border border-gray-300 dark:border-gray-700 px-3 self-stretch",
          `grid ${gridTemplateClass}`,
          "focus-within:outline",
          {
            "border-red-500 dark:border-red-400": !!errorMessage,
            "focus-within:outline-red-400": !!errorMessage,
          },
          className
        )}
      >
        {prefix && (
          <div className="flex items-center justify-center py-2 pr-3 text-gray-500 dark:text-gray-300">
            {prefix}
          </div>
        )}
        {children}
        {suffix && (
          <div className="flex items-center justify-center py-2 pl-3 text-gray-500 dark:text-gray-300">
            {suffix}
          </div>
        )}
      </div>
      {!!errorMessage && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
