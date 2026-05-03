import { LiveStream } from "@/components";
import { StreamDetails } from "@/features/stream/components";
import { LiveChat } from "@/features/comments/components";

export default function Stream() {
  return (
    <main className="p-4 w-full">
      <div className="w-full grid grid-cols-[1fr_20rem] gap-4 relative">
        <div className="w-full flex items-center justify-start gap-4 flex-col">
          <LiveStream streamUrl="http://localhost:8080/hls/rivo_live_046100a66c77ba749583919721698853a4ebb9e44a2a067b.m3u8" />
          <StreamDetails />
        </div>

        <LiveChat />
      </div>
    </main>
  );
}
