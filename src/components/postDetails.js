import React, { useState } from "react";
import { useQuery } from "react-query";
import * as api from "../utils/api-utils";
import PostForm from "./postForm";

function PostDetails({ postId }) {
  const [isEditing, setIsEditing] = useState(false);
  // immediately tries to make this call unless we add enabled in options object
  const {
    data: post,
    isLoading,
    isFetching,
  } = useQuery(["post", postId], () => api.getPost(postId), {
    enabled: !!postId,
  });

  if (!postId) {
    return "No Post selected";
  }
  if (isLoading) {
    return "Loading your post...";
  }
  return (
    <div>
      {/* {isFetching && "Background refetching..."} */}

      {isEditing ? (
        <PostForm post={post} setIsEditing={setIsEditing} />
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "CANCEL" : "EDIT"}
      </button>
    </div>
  );
}

export default PostDetails;
