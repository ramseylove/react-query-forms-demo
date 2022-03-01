import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPosts, deletePost } from "../utils/api-utils";

function PostList({ setPostID, showAddPost }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery("posts", getPosts);
  const { isLoading, mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  // const tenData = data?.slice(1, 10);
  const handleDelete = (id) => {
    alert("Are you sure?");
  };

  if (isLoading) {
    return "Loading Posts....";
  }

  if (isError) {
    return "Something went wrong";
  }

  return (
    <div>
      <h2>Post List</h2>
      <button type="button" onClick={showAddPost}>
        Add Post
      </button>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => setPostID(post.id)}>View</button>
            <button onClick={handleDelete}>Delete</button> }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
