import { Comment } from "@/types/comment.type";
import localApi from "./localApi";

interface ICreateComment {
  movieId: number;
  userId: string;
  content: string;
}

export const commentService = {
  getCommentsByFilmId: async (id: string) => {
    const response = await localApi.get<Comment[]>(`/api/comments`, {
      params: { movieId: id },
    });
    return response.data;
  },
  createComment: async ({ movieId, userId, content }: ICreateComment) => {
    // if (content.trim()) return;
    const response = await localApi.post(
      "/api/comments",
      {
        movieId,
        userId,
        content,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },
};
