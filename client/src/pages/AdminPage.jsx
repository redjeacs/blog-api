import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { useAuth } from "../contexts/authProvider";

function AdminPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
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
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const newPost = () => {
    window.location.href = "/admin/write";
  };

  if (!user) {
    return (
      <div className="text-center text-red-600 font-semibold my-8">
        Please sign in to access the admin page.
      </div>
    );
  }

  if (!user.isAuthor) {
    return (
      <div className="text-center text-red-600 font-semibold my-8">
        You do not have author permissions.
      </div>
    );
  }

  if (!user.isAuthor) {
    return (
      <div className="text-center text-red-600 font-semibold my-8">
        Access Denied. You do not have author permissions.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center w-4/5 mx-auto my-4">
        <button
          onClick={newPost}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Post
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isAuthor={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
