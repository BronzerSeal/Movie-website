import { Comment } from "@/types/comment.type";
import { create } from "zustand";

interface SingleMovie {
  comments: Comment[] | null;
  loading: boolean;
  error: string | null;

  setComments: (data: Comment[]) => void;
  deleteComment: (comId: string) => void;

  setLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
}

export const useCommentStore = create<SingleMovie>((set, get) => ({
  comments: null,
  loading: false,
  error: null,
  setComments: (comments) => set({ comments, loading: false }),
  setLoading: (value) => set({ loading: value }),
  setError: (message) => set({ error: message }),
  deleteComment: (comId) => {
    const updatedComments = get().comments?.filter((com) => com.id !== comId);
    set({ comments: updatedComments });
  },
}));
