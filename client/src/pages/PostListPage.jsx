import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

function PostListPage() {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(
            (post) => post.isPublished && <PostCard key={post.id} post={post} />
          )}
        </div>
      )}
    </div>
  );
}

export default PostListPage;
