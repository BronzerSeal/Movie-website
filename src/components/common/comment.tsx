"use client";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { Avatar } from "@heroui/react";
import { useState } from "react";
interface Props {
  userImg: string;
  name: string;
  createdAt: string;
  content: string;
  maxLength?: number;
}

const Comment = ({
  userImg,
  name,
  createdAt,
  content,
  maxLength = 200,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLong = content.length > maxLength;
  const displayedContent =
    isExpanded || !isLong ? content : content.slice(0, maxLength) + "...";

  return (
    <div className="flex mb-4 max-w-full overflow-hidden break-words">
      <div className="mr-2 shrink-0">
        {userImg ? <Avatar src={userImg} /> : <Avatar name={name} />}
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center flex-wrap">
          <h1 className="font-bold text-[18px] mr-2">{name}</h1>
          <p className="text-gray-400 text-[15px]">
            {formatRelativeTime(createdAt)}
          </p>
        </div>

        <p className="text-gray-200 break-words whitespace-pre-wrap overflow-hidden">
          {displayedContent}
          {isLong && (
            <button
              className="text-red-500 ml-1 hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Скрыть" : "Читать полностью"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Comment;
