import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";

interface LiveStreamProps {
  streamUrl: string;
}

const LiveStream = forwardRef<HTMLVideoElement, LiveStreamProps>(
  ({ streamUrl }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // 🔥 expose internal video element to parent
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    useEffect(() => {
      if (!videoRef.current) return;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });

        return () => {
          hls.destroy();
        };
      } else {
        videoRef.current.src = streamUrl;
        videoRef.current.play();
      }
    }, [streamUrl]);

    return (
      <div className="w-full aspect-[16/10] border border-bor bg-sur rounded-lg flex items-center justify-center overflow-hidden max-w-[862px]">
        <video
          ref={videoRef}
          controls
          autoPlay
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  },
);

LiveStream.displayName = "LiveStream";

export default LiveStream;
