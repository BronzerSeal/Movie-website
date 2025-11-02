"use client";
import { commentService } from "@/services/commentService";
import { useCommentStore } from "@/store/comment.store";
import { Comment } from "@/types/comment.type";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  movieId: string;
  comments: Comment[];
}

const CreateComment = ({ movieId, comments }: IProps) => {
  const [newComment, setNewComment] = useState("");
  const { data: session, status } = useSession();
  const { setComments } = useCommentStore();

  async function handleCreateComment() {
    if (!newComment.trim()) return;
    if (!session?.user?.id || !session?.user.email) {
      console.log("no data");
      toast.error("unauthorized");
      return;
    }

    const res = await commentService.createComment({
      movieId: Number(movieId),
      userId: session?.user.id,
      username: session?.user.name || session?.user.email,
      content: newComment,
      avatarUrl: session?.user.image,
    });
    setComments([res, ...comments]);
    setNewComment("");
  }
  return (
    <>
      {status === "authenticated" ? (
        <div className="flex gap-2 mb-4">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напиши комментарий..."
            className="flex-1 border rounded-lg px-3 py-2 bg-transparent"
          />
          <Button color="danger" onPress={handleCreateComment}>
            Send
          </Button>
        </div>
      ) : (
        <p>Authorize to write comments</p>
      )}
    </>
  );
};

export default CreateComment;
