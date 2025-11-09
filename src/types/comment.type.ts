import { AxiosResponse } from "axios";

export interface Comment {
  content: string;
  createdAt: string;
  id: string;
  movieId: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    image: string;
    email: string;
  };
}

export type CommentResponse = AxiosResponse<Comment[]>;
