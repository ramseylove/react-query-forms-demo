import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500/",
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
});

export const getPosts = () => {
  const data = api.get("/posts?_sort=id&_order=desc").then((res) => res.data);

  return data;
};

export const getPost = (id) => api.get(`posts/${id}`).then((res) => res.data);

export const updatePost = ({ id, ...updatedPost }) =>
  api.put(`/posts/${id}`, updatedPost).then((res) => res.data);

export const addPost = ({ ...newPost }) =>
  api.post("/posts", newPost).then((res) => res.data);

export const deletePost = (id) =>
  api.delete(`posts/${id}`).then((res) => res.data);
