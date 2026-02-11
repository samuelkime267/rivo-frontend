import { useAuth } from "@/stores";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema, type LoginSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { Button, ErrorText, InlineLoader, Input } from "@/components";
import { FcGoogle } from "react-icons/fc";
import { BACKEND_URL, BASE_URL } from "@/config/env";
import { DEFAULT_REDIRECT_ROUTE } from "@/data/routes.data";

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginSchemaType>,
  });

  const submit = async (bodyData: LoginSchemaType) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const { data } = await api.post("/auth/login", bodyData);
      setToken(data.token.accessToken);
      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        setError("Something went wrong");
        return;
      }
      setError(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setError(undefined);
    // same tab
    // window.location.href = `${BASE_URL}/auth/google`;

    // new tab
    window.open(`${BASE_URL}/auth/google`, "_blank", "width=500,height=600");
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== BACKEND_URL) return;
      if (event.data.from === "oauth") {
        if (event.data.success) {
          window.location.href = DEFAULT_REDIRECT_ROUTE;
          return;
        }

        setError(event.data.message);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <form className="w-full space-y-4 max-w-md" onSubmit={handleSubmit(submit)}>
      <ErrorText error={error} />

      <Input
        label="Email"
        type="email"
        name="email"
        required
        placeholder="example@gmail.com"
        error={errors.email?.message}
        register={register}
      />
      <div className="w-full flex flex-col gap-1">
        <Input
          label="Password"
          type="password"
          name="password"
          // containerClassName="border border-red-900"
          required
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register}
        />
        <NavLink
          to="/auth/forgot-password"
          className="text-sm text-pri ml-auto"
        >
          Forgot password?
        </NavLink>
      </div>
      <Button type="submit" btnType="primary">
        {isLoading ? <InlineLoader /> : "Login"}
      </Button>

      <div className="w-full flex items-center justify-center gap-1">
        <div className="border-t border-t-text-mute w-full" />
        <p className="text-xs text-center text-text-mute">or</p>
        <div className="border-t border-t-text-mute w-full" />
      </div>
      <Button type="button" btnType="secondary" onClick={loginWithGoogle}>
        <FcGoogle className="size-4" /> Login with Google
      </Button>
    </form>
  );
}
