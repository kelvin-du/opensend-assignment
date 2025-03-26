import Button from "@/common/components/Button";
import Input from "@/common/components/Input";
import { InputPassword } from "@/common/components/InputPassword";
import Logo from "@/common/components/Logo";
import { useDarkMode } from "@/common/hooks/dark-mode";
import { redirectToDefaultRoute } from "@/common/utils/router";
import { useLoginMutation } from "@/features/auth/api";
import { LOGIN_ERROR_CODES } from "@/features/auth/error-codes";
import { getAccessToken, setTokens } from "@/features/auth/utils";
import { isQueryError } from "@/redux/rtk-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (getAccessToken()) {
      return redirectToDefaultRoute();
    }
  },
  component: LoginRouteComponent,
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email must have the correct format" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginRouteComponent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const isLoginButtonDisabled =
    !!errors.email ||
    !!errors.password ||
    !dirtyFields.email ||
    !dirtyFields.password;

  const [login, result] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    const res = await login(data);

    if (isQueryError(res.error)) {
      switch (res.error.data.code) {
        case LOGIN_ERROR_CODES.AUTH_PASSWORD_MISMATCHED:
          setError("password", { message: res.error.data.message });
          return;
        default:
          setError("email", { message: res.error.data.message });
          return;
      }
    }

    if (res.data) {
      const { tokens } = res.data;
      setTokens(tokens.accessToken, tokens.clientToken);

      if (res.data.view.type === "ADMIN") {
        return navigate({ to: "/admin" });
      }
      return navigate({ to: "/dashboard" });
    }
  };

  const { toggleDarkMode, DarkModeIcon } = useDarkMode();

  return (
    <div className="p-4 flex flex-col items-center justify-center bg-gray-300 dark:bg-gray-700 min-h-[100dvh]">
      <Button
        className="absolute top-4 right-4 rounded-full aspect-square p-2.5"
        size="sm"
        variant="secondary"
        onClick={toggleDarkMode}
      >
        <DarkModeIcon size={20} />
      </Button>
      <Logo className="mb-6" />
      <div className="bg-white dark:bg-gray-800 rounded-lg text-center w-full md:w-[36rem] px-12 py-12">
        <h1 className="text-2xl font-bold pb-4">Welcome back!</h1>
        <p className="text-gray-500 dark:text-gray-400 pb-10">
          Log in to continue with Opensend
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            prefix={<MailIcon />}
            autoFocus
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <InputPassword
            prefix={<LockIcon />}
            {...register("password")}
            errorMessage={errors.password?.message}
          />
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="primary"
              isLoading={result.isLoading}
              disabled={isLoginButtonDisabled}
            >
              Login
            </Button>
            <Button variant="secondary">Forgot Your Password??</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
