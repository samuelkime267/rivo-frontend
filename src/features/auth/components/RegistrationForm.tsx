import { useAuth } from "@/stores";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { Button, ErrorText, InlineLoader, Input } from "@/components";

export default function RegistrationForm() {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(
      registerSchema,
    ) as unknown as Resolver<RegisterSchemaType>,
  });

  const submit = async (bodyData: RegisterSchemaType) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const { data } = await api.post("/auth/register", bodyData);
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

  return (
    <form className="w-full space-y-4 max-w-md" onSubmit={handleSubmit(submit)}>
      <ErrorText error={error} />

      <Input
        label="Name"
        name="name"
        required
        placeholder="John Doe"
        error={errors.name?.message}
        register={register}
      />
      <Input
        label="Username"
        name="username"
        required
        placeholder="JohnDoe"
        error={errors.username?.message}
        register={register}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        required
        placeholder="example@gmail.com"
        error={errors.email?.message}
        register={register}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        required
        placeholder="Enter your password"
        error={errors.password?.message}
        register={register}
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        required
        placeholder="Enter your password"
        error={errors.confirmPassword?.message}
        register={register}
      />
      <Button disabled={isLoading} type="submit" btnType="primary">
        {isLoading ? <InlineLoader /> : "Register"}
      </Button>
    </form>
  );
}
