import { Button, ErrorText, InlineLoader, Input, TextArea } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import InputTag from "@/components/InputTag";
import type useStreamDetails from "../utils/useStreamDetails";

type StreamDetailsDialogProps = typeof useStreamDetails extends () => infer R
  ? {
      [K in keyof R]: R[K];
    }
  : never;

export default function StreamDetailsDialog({
  defaultInfoData,
  isLoading,
  register,
  submit,
  setValue,
  tags,
  setTags,
  error,
  isOpen,
  setIsOpen,
}: StreamDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-4rem)] overflow-auto">
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="w-full">
            <h1 className="font-medium text-lg capitalize">Stream Details</h1>
          </div>

          <form className="w-full space-y-4" onSubmit={submit}>
            <ErrorText error={error} />

            <Input
              label="Title"
              name="name"
              required
              placeholder="Building a Web3 Marketplace Live"
              register={register}
              defaultValue={defaultInfoData?.name}
            />
            <TextArea
              label="Description"
              name="description"
              required
              placeholder="Building a Web3 Marketplace Live"
              register={register}
              defaultValue={defaultInfoData?.description ?? undefined}
            />

            <Input
              label="Category"
              name="category"
              required
              placeholder="Select a category"
              register={register}
              defaultValue={defaultInfoData?.category}
            />
            <InputTag
              label="Tags"
              values={tags}
              onValueChange={(val) => {
                setValue("tags", val);
                setTags(val);
              }}
              placeholder="Enter tags separated by commas"
              // required
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
  );
}
