import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../utils/api-utils";

function PostForm({ post, setIsEditing }) {
  const [fields, setFields] = useState({ ...post });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(api.updatePost, {
    onMutate: (updatedPost) => {
      // optimistic loading
      // gonna show user the data they just submitted even without waiting for response
      //   queryClient.setQueryData(["post", post.id], updatedPost);
      setIsEditing(false);
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.setQueryData(["post", post.id], response);

      //trigger the old data in the list to be updated
      queryClient.invalidateQueries("posts");
    },
  });

  const handleChange = (event) => {
    // pull the name with value from the form
    const { name, value } = event.target;
    // add it to the state object
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(fields);
    //
    mutate(fields);
  };

  if (isLoading) {
    return <div>"Saving changes"</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:{" "}
            <input
              type="text"
              name="title"
              value={fields.title}
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 20 }}
            />
          </label>
        </div>
        <div>
          <label style={{ marginBottom: 20 }}>
            Body:{" "}
            <textarea
              type="text"
              name="body"
              value={fields.body}
              onChange={handleChange}
              rows="7"
              style={{ width: "100%", marginBottom: 20 }}
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default PostForm;
