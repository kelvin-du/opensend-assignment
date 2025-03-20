import { useLogout } from "@/features/auth/hooks";
import { LogOutIcon } from "lucide-react";
import { useDarkMode } from "../hooks/dark-mode";
import Button from "./Button";
import Logo from "./Logo";

export default function Header() {
  const { toggleDarkMode, DarkModeIcon } = useDarkMode();

  const logout = useLogout();

  return (
    <header className="px-4 py-2 flex items-center w-full bg-primary">
      <Logo className="text-white" />
      <div className="flex-1" />
      <div className="flex gap-3 items-center">
        <Button
          variant="secondary"
          className="p-2 rounded-full"
          onClick={toggleDarkMode}
        >
          <DarkModeIcon size={18} className="!text-gray-200" />
        </Button>
        <Button className="p-2 text-gray-300" variant="ghost" onClick={logout}>
          Logout
          <LogOutIcon size={18} className="ml-2" />
        </Button>
      </div>
    </header>
  );
}
