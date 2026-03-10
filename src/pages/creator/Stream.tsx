import { LiveStream } from "@/components";
import { streams } from "@/data/stream.data";
import { StreamDetails } from "@/features/stream/components";
import { LiveChat } from "@/features/comments/components";

export default function Stream() {
  const streamdata = streams[0];

  return (
    <main className="p-4 w-full">
      <div className="w-full grid grid-cols-[1fr_20rem] gap-4 relative">
        <div className="w-full flex items-center justify-start gap-4 flex-col">
          <LiveStream streamUrl="http://localhost:8080/hls/rivo_live_046100a66c77ba749583919721698853a4ebb9e44a2a067b.m3u8" />
          <StreamDetails {...streamdata} />
        </div>

        <LiveChat />
      </div>
    </main>
  );
}
