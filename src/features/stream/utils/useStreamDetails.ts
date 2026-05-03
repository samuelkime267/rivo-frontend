import { AppError } from "@/utils";
import { useEffect, useState } from "react";
import { useGetDefaultStreamInfo, useGetStreamKey } from "../utils";
import { toast } from "sonner";
import useUpdateStreamInfo from "../utils/useUpdateStreamInfo";

export default function useStreamDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<"details" | "settings">(
    "details",
  );
  const [showKey, setShowKey] = useState(false);

  const { data } = useGetStreamKey();
  const { streamKey } = data || {};

  const {
    data: defaultInfoData,
    error: defaultInfoError,
    isLoading: defaultInfoIsLoading,
  } = useGetDefaultStreamInfo();
  const { tags: defaultTags } = defaultInfoData || {};

  const { formErrors, isLoading, register, submit, setValue } =
    useUpdateStreamInfo({ setError, setIsOpen, defaultInfoData });

  useEffect(() => {
    if (defaultInfoError instanceof AppError) {
      if (defaultInfoError.statusCode === 404) {
        setIsOpen(true);
        return;
      }

      toast.error(defaultInfoError.message);
    }
  }, [defaultInfoError]);

  useEffect(() => {
    if (defaultTags) {
      setTags(defaultTags);
    }
  }, [defaultTags]);

  return {
    isOpen,
    setIsOpen,
    error,
    setError,
    tags,
    setTags,
    activePanel,
    setActivePanel,
    showKey,
    setShowKey,
    defaultInfoData,
    defaultInfoIsLoading,
    formErrors,
    isLoading,
    register,
    submit,
    setValue,
    streamKey,
  };
}
