import { Button, LiveStream } from "@/components";
import { StreamDetails } from "@/features/stream/components";
import { LiveChat } from "@/features/comments/components";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";

export default function Stream() {
  const [liveStreamUrl, setLiveStreamUrl] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const playbackId = "qP_RE8kQac_-";
    const getUrl = async () => {
      const { data } = await api.get(`/stream/${playbackId}/token`);
      const { token, expires } = data || {};
      console.log("Token:", token, "Expires:", expires);

      if (!token || !expires) return;
      const streamUrl = `http://localhost:8080/hls/${playbackId}/index.m3u8?token=${token}&expires=${expires}`;
      setLiveStreamUrl(streamUrl);
      console.log("Stream URL:", streamUrl);

      // if (videoRef.current) {
      //   videoRef.current.src = streamUrl;
      //   videoRef.current.play().catch((err) => {
      //     console.error("Error playing video:", err);
      //   });
      //   setIsLive(true);
      // }
    };

    getUrl();
  }, []);

  //   // 1. get token
  // const { token, expires } = await fetch(`/api/v1/stream/${playbackId}/token`).then(r => r.json());
  // // 2. play
  // player.src(`/hls/${playbackId}/index.m3u8?token=${token}&expires=${expires}`);

  return (
    <main className="p-4 w-full">
      <div className="w-full grid grid-cols-[1fr_20rem] gap-4 relative">
        <div className="w-full flex items-center justify-start gap-4 flex-col relative">
          {liveStreamUrl && (
            <LiveStream
              ref={videoRef}
              // streamUrl="http://localhost:8080/hls/rivo_live_789ba3309bbabd6fa92da68f1768e92b0ea46ff001dfd68e.m3u8"
              streamUrl={liveStreamUrl}
            />
          )}

          {!isLive && (
            <div className="absolute top-0 left-0 w-full aspect-[16/10] border border-bor bg-sur rounded-lg flex items-center justify-center overflow-hidden max-w-[862px] flex-col gap-4">
              <p className="text-2xl">You're not live</p>
              <p>Stream shows once you go live</p>
              <Button
                btnType="primary"
                className="w-fit"
                onClick={() => setIsLive(true)}
              >
                Go Live
              </Button>
            </div>
          )}

          <StreamDetails />
        </div>

        <LiveChat />
      </div>
    </main>
  );
}
