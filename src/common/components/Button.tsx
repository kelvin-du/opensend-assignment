import { ButtonHTMLAttributes } from "react";
import { cx } from "../utils/styles";
import { Loader } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        "group relative cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center",
        {
          "active:opacity-75": !props.disabled,
          "bg-primary": variant === "primary",
          "bg-transparent inset-shadow-gray-400 inset-shadow-[0_0_0_1px]":
            variant === "secondary",
          "bg-transparent": variant === "ghost",
          "px-3 py-2 text-sm": size === "sm",
          "px-4 py-3 text-md": size === "md",
          "px-5 py-4 text-lg": size === "lg",
          "gb-transparent": isLoading,
        },
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <div
        className={cx("flex items-center justify-center", {
          "text-white": variant === "primary",
          "text-gray-800 dark:text-gray-200": variant === "secondary",
          invisible: isLoading,
        })}
      >
        {children}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      )}
    </button>
  );
}
