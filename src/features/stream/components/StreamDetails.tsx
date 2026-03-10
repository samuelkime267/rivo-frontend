import { Button, ErrorText, InlineLoader, Input, TextArea } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { copyText } from "@/utils";
import { useState } from "react";
import { FaCopy, FaEye, FaEyeSlash } from "react-icons/fa6";

type StreamDetailsProps = {
  id: string;
  title: string;
  description: string;
  creator: string;
  viewers: number;
  category: string;
  isLive: boolean;
  startedAt: string;
  tags: string[];
  thumbnail: string;
  streamUrl: string;
};

export default function StreamDetails({
  title,
  description,
  category,
  tags,
}: StreamDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState<"details" | "settings">(
    "details",
  );
  const [showKey, setShowKey] = useState(false);
  const [streamKey, setStreamKey] = useState("RIVO_STREAM_KEY");
  const [streamUrl, setStreamUrl] = useState("rtmp://localhost:1935/live");

  return (
    <div className="w-full p-4 border border-bor bg-sur rounded-lg flex items-start justify-start overflow-hidden max-w-[862px] flex-col gap-4">
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
      </div>

      {activePanel === "details" && (
        <div className="w-full space-y-2.5">
          <div className="flex items-start justify-between w-full">
            <div className="space-y-0.25">
              <p className="text-xs text-text-mute">Title</p>
              <p>{title}</p>
            </div>
            <Button
              btnType="primary"
              className="w-fit text-sm"
              onClick={() => setIsOpen(true)}
            >
              Edit Details
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-4rem)] overflow-auto">
                <div className="w-full flex flex-col gap-4 items-center justify-center">
                  <div className="w-full">
                    <h1 className="font-medium text-lg capitalize">
                      Stream Stream Details
                    </h1>
                  </div>

                  <form className="w-full space-y-4" onSubmit={() => {}}>
                    <ErrorText error={error} />

                    <Input
                      label="Title"
                      name="title"
                      required
                      placeholder="Building a Web3 Marketplace Live"
                      // error={errors.name?.message}
                      // register={register}
                    />
                    <TextArea
                      label="Description"
                      name="description"
                      required
                      placeholder="Building a Web3 Marketplace Live"
                      // error={errors.description?.message}
                      // register={register}
                    />

                    <Input
                      label="Category"
                      name="category"
                      required
                      placeholder="Select a category"
                      // error={errors.username?.message}
                      // register={register}
                    />
                    <Input
                      label="Tags"
                      name="tags"
                      required
                      placeholder="Enter tags separated by commas"
                      // error={errors.username?.message}
                      // register={register}
                    />
                    <div className="w-full flex items-center justify-end gap-2">
                      <Button
                        disabled={isLoading}
                        onClick={() => setIsOpen(false)}
                        type="button"
                        btnType="secondary"
                        className="w-fit border-bor min-w-[6rem]"
                      >
                        {isLoading ? <InlineLoader /> : "Cancel"}
                      </Button>
                      <Button
                        disabled={isLoading}
                        type="submit"
                        btnType="primary"
                        className="w-fit min-w-[9.5rem]"
                      >
                        {isLoading ? <InlineLoader /> : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Description</p>
            <p>{description}</p>
          </div>
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Category</p>
            <p className="capitalize">{category}</p>
          </div>
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Tags</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-white/10 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activePanel === "settings" && (
        <div className="w-full space-y-2.5">
          <div className="space-y-0.25">
            <p className="text-xs text-text-mute">Stream URL</p>
            <div className="flex items-center justify-start gap-2">
              <p>{streamUrl}</p>
              <Button onClick={() => copyText(streamUrl)}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
