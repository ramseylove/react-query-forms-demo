import { useState } from "react";
import "./App.css";
import PostAddForm from "./components/postAddForm";
import PostDetails from "./components/postDetails";
import PostList from "./components/postList";

function App() {
  const [selectedPostID, setSelectedPostID] = useState();
  const [showAddPost, setShowAddPost] = useState(false);
  return (
    <div className="App">
      <div
        style={{ padding: 20, width: "30%", borderRight: "2px solid black" }}
      >
        <PostList setPostID={setSelectedPostID} showAddPost={setShowAddPost} />
      </div>
      <div style={{ padding: 20, width: "70%" }}>
        <h2>Post details</h2>
        {selectedPostID && !showAddPost && (
          <PostDetails postId={selectedPostID} />
        )}
        {showAddPost && !selectedPostID && (
          <PostAddForm
            showAddPost={setShowAddPost}
            setPostId={setSelectedPostID}
          />
        )}
      </div>
    </div>
  );
}

export default App;
