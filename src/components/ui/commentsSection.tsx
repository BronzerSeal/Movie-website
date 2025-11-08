"use client";
import { Comment as CommentType } from "@/types/comment.type";
import Comment from "../common/comment";
import { Pagination } from "@heroui/react";
import { useState } from "react";
import CreateComment from "./createComment";

interface IProps {
  comments: CommentType[];
  movieId: string;
}

const CommentsSection = ({ comments, movieId }: IProps) => {
  const COMMENTS_PER_PAGE = 4;
  const [page, setPage] = useState(1);

  const start = (page - 1) * COMMENTS_PER_PAGE;
  const end = start + COMMENTS_PER_PAGE;
  const currentComments = comments.slice(start, end);

  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  return (
    <section className="container">
      <h1 className="text-3xl font-bold mt-4 mb-2">Comments</h1>

      {comments.length > 0 ? (
        <>
          {currentComments.map((com) => (
            <Comment
              key={com.id}
              userImg={com.user.image}
              name={com.user.name || com.user.email}
              createdAt={com.createdAt}
              content={com.content}
            />
          ))}
          {comments.length > 4 && (
            <Pagination
              showShadow
              initialPage={1}
              total={totalPages}
              onChange={setPage}
              color="danger"
            />
          )}

          <div className="mt-2">
            <CreateComment movieId={movieId} comments={comments} />
          </div>
        </>
      ) : (
        <>
          <p className="mb-2">Create first comment</p>

          <CreateComment movieId={movieId} comments={comments} />
        </>
      )}
    </section>
  );
};

export default CommentsSection;
