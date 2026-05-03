import { AppError } from "@/utils";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import {
  DefaultStreamInfoSchema,
  type DefaultStreamInfoSchemaType,
} from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDefaultStreamInfoRequest,
  updateDefaultStreamInfoRequest,
} from "../services";
import { STREAM_DETAIL_KEY } from "@/data/queryKeys.data";

type UseUpdateStreamInfoInputType = {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  defaultInfoData?: DefaultStreamInfoSchemaType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function useUpdateStreamInfo({
  setError,
  defaultInfoData,
  setIsOpen,
}: UseUpdateStreamInfoInputType) {
  const queryClient = useQueryClient();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<DefaultStreamInfoSchemaType>({
    resolver: zodResolver(
      DefaultStreamInfoSchema,
    ) as unknown as Resolver<DefaultStreamInfoSchemaType>,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: defaultInfoData
      ? updateDefaultStreamInfoRequest
      : createDefaultStreamInfoRequest,

    onSuccess: () => {
      toast.success("Stream info updated successfully");
      queryClient.invalidateQueries({ queryKey: STREAM_DETAIL_KEY });
      setIsOpen(false);
    },

    onError: (error) => {
      if (error instanceof AppError) {
        toast.error(error.message);
        setError(error.message);
        return;
      }

      toast.error("Something went wrong while updating stream info");
      setError("Something went wrong");
    },
  });

  const submit = handleSubmit((data) => {
    setError(undefined);
    mutate(data);
  });

  return {
    formErrors: errors,
    register,
    submit,
    isLoading: isPending,
    setValue,
  };
}
