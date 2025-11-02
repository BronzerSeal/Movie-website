import { Comment } from "@/types/comment.type";
import { create } from "zustand";

interface SingleMovie {
  comments: Comment[] | null;
  loading: boolean;
  error: string | null;

  setComments: (data: Comment[]) => void;

  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
}

export const useCommentStore = create<SingleMovie>((set) => ({
  comments: null,
  loading: false,
  error: null,
  setComments: (comments) => set({ comments, loading: false }),
  setLoading: (value) => set({ loading: value }),
  setError: (message) => set({ error: message }),
}));
