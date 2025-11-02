export interface Comment {
  avatarUrl: string;
  content: string;
  createdAt: string;
  id: string;
  movieId: string;
  updatedAt: string;
  userId: string;
  username: string;
}

export interface CommentResponse {
  config: any;
  data: Comment[];
  headers: any;
  request: any;
  status: number;
  statusText: string;
}
