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

export interface CommentResponse {
  config: any;
  data: Comment[];
  headers: any;
  request: any;
  status: number;
  statusText: string;
}
