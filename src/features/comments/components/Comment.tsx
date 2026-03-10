import { UserProfileImg } from "@/features/user/components";

type CommentProps = {
  username: string | null;
  profilePicture?: string | null;
  commentText: string;
};

export default function Comment({
  username,
  profilePicture,
  commentText,
}: CommentProps) {
  return (
    <div className="inline leading-[1]">
      <div className="inline-flex items-center gap-1 bg-white/10 w-fit py-0.5 px-1 rounded-[4px]">
        <UserProfileImg
          name={username}
          profilePicture={profilePicture}
          className="size-3"
        />
        <p className="text-xs text-text-pri inline-block font-medium">
          {username}
        </p>
      </div>
      <div className="inline text-wrap text-xs"> {commentText}</div>
    </div>
  );
}
