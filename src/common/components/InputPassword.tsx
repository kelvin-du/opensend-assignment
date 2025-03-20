import { useRef, useState } from "react";
import Input, { InputProps } from "./Input";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

export type InputPasswordProps = Omit<InputProps, "type">;

export function InputPassword(props: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleVisibility = () => {
    const cursorPositionStart = inputRef.current?.selectionStart ?? 0;
    const cursorPositionEnd =
      inputRef.current?.selectionEnd ?? cursorPositionStart;
    setShowPassword(!showPassword);
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.setSelectionRange(
        cursorPositionStart,
        cursorPositionEnd
      );
    });
  };

  const SuffixIcon = !showPassword ? EyeClosedIcon : EyeIcon;

  return (
    <Input
      ref={inputRef}
      type={showPassword ? "text" : "password"}
      autoComplete="off"
      {...props}
      suffix={
        <SuffixIcon className="cursor-pointer" onClick={toggleVisibility} />
      }
    />
  );
}
