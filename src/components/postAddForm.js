import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { addPost } from "../utils/api-utils";

const initialData = {
  title: "",
  body: "",
};

function PostAddForm({ showAddPost, setPostId }) {
  const [fields, setFields] = useState(initialData);

  const queryClient = useQueryClient();
  const { data, isLoading, mutate } = useMutation(addPost, {
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries("posts");
      showAddPost(false);
      setPostId(response.id);
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default PostAddForm;
