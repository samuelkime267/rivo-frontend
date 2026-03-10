import { Button, Input } from "@/components";
import { FaRegSmile } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/stores";
import Comment from "./Comment";

export default function LiveChat() {
  const { profilePicture, username = "@Guesty" } = useAuth();

  return (
    <div className="w-full border border-bor bg-sur rounded-lg sticky top-[5.7rem] right-0 h-[calc(100vh-5.7rem-1rem)] flex flex-col">
      <div className="w-full border-b border-b-bor p-2.5">
        <h1 className="font-medium text-lg capitalize">Live chat</h1>
      </div>
      <div className="h-full overflow-y-auto p-2.5 flex flex-col gap-2">
        <Comment
          username={username}
          profilePicture={profilePicture}
          commentText="Hello everyone!"
        />
        <Comment
          username={username}
          profilePicture={profilePicture}
          commentText="As of early 2026, the latest stable release of MongoDB is the 8.2-series, while 8.0 is the current major, Generally Available
                (GA) release."
        />
        <Comment
          username={username}
          profilePicture={profilePicture}
          commentText="As of early 2026, the latest stable release of MongoDB is the 8.2-series, while 8.0 is the current major, Generally Available
                (GA) release. MongoDB 8.0 offers significant performance
                improvements, including up to 32% better throughput for
                applications and 56% faster bulk writes."
        />
      </div>
      <div className="w-full border-t border-t-bor p-2.5">
        <Input
          placeholder="Send a message..."
          className="flex-row-reverse pr-2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <FaRegSmile className="size-4 text-text-pri" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-bg" align="end">
              <div className="h-24 max-w-[17rem]">
                <p>Emojis and or stickers are to be displayed here</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </Input>
      </div>
    </div>
  );
}
