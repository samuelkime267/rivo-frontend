import { Button } from "@/components";
import { cn } from "@/lib/utils";
import { copyText } from "@/utils";
import { FaCopy, FaEye, FaEyeSlash } from "react-icons/fa6";
import { STREAM_URL } from "@/config/env";
import { Loader } from "lucide-react";
import useStreamDetails from "../utils/useStreamDetails";
import StreamDetailsDialog from "./StreamDetailsDialog";

export default function StreamDetails() {
  const streamDetails = useStreamDetails();
  const {
    activePanel,
    defaultInfoData,
    setActivePanel,
    defaultInfoIsLoading,
    setIsOpen,
    showKey,
    streamKey,
    setShowKey,
  } = streamDetails;
  const {
    name,
    description,
    category,
    tags: defaultTags,
  } = defaultInfoData || {};

  return (
    <div className="w-full p-4 border border-bor bg-sur rounded-lg flex items-start justify-start overflow-hidden max-w-[862px] flex-col gap-4 relative">
      <div className="flex items-center justify-start gap-4 w-full border-b border-b-bor">
        <Button
          onClick={() => setActivePanel("details")}
          className={cn(
            "border-b border-b-transparent pb-2 px-1.5 hover:border-b-white transition-colors duration-300",
            {
              " border-b-white": activePanel === "details",
            },
          )}
        >
          <h1 className="font-medium text-lg capitalize">Details</h1>
        </Button>
        {defaultInfoData && (
          <Button
            onClick={() => setActivePanel("settings")}
            className={cn(
              "border-b border-b-transparent pb-2 px-1.5 hover:border-b-white transition-colors duration-300",
              {
                " border-b-white": activePanel === "settings",
              },
            )}
          >
            <h1 className="font-medium text-lg capitalize">Settings</h1>
          </Button>
        )}
      </div>

      {activePanel === "details" && (
        <div className="w-full space-y-2.5">
          <div className="flex items-start justify-between w-full">
            <div className="space-y-0.25">
              <p className="text-xs text-text-mute">Title</p>
              <p>{name || "-"}</p>
            </div>
            <Button
              btnType="primary"
              className="w-fit text-sm"
              onClick={() => setIsOpen(true)}
            >
              Edit Details
            </Button>
          </div>
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Description</p>
            <p>{description || "-"}</p>
          </div>
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Category</p>
            <p className="capitalize">{category || "-"}</p>
          </div>
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Tags</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {defaultTags && defaultTags.length > 0 ? (
                defaultTags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-white/10 px-2 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </div>
                ))
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
        </div>
      )}

      {defaultInfoData && activePanel === "settings" && (
        <div className="w-full space-y-2.5">
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Stream URL</p>
            <div className="flex items-center justify-start gap-2">
              <p>{STREAM_URL}</p>
              <Button onClick={() => copyText(STREAM_URL)}>
                <FaCopy className="size-3" />
              </Button>
            </div>
          </div>
          <div className="space-y-0.25">
            <div className="flex items-center justify-start gap-2">
              <p className="text-xs text-text-mute">Stream Key</p>
              <Button onClick={() => setShowKey((prev) => !prev)}>
                {!showKey ? (
                  <FaEyeSlash className="size-3" />
                ) : (
                  <FaEye className="size-3" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-start gap-2">
              {streamKey ? (
                <>
                  {!showKey ? (
                    <>
                      <p>******************************************</p>
                    </>
                  ) : (
                    <>
                      <p>{streamKey}</p>
                      <Button onClick={() => copyText(streamKey)}>
                        <FaCopy className="size-3" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                "Something went wrong fetching your stream key"
              )}
            </div>
          </div>
        </div>
      )}

      {defaultInfoIsLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-bg/50 backdrop-blur-sm flex items-center justify-center flex-col gap-4 z-2">
          <Loader className="size-10 animate-spin text-white" />
          <p>Fetching Stream Details</p>
        </div>
      )}

      <StreamDetailsDialog {...streamDetails} />
    </div>
  );
}
