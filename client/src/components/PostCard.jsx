import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

function PostCard({ post, isAuthor = false }) {
  const { token } = useAuth();

  const togglePublish = async () => {
    const postId = post.id;
    try {
      const res = await fetch(
        `http://localhost:8080/api/posts/${postId}/publish`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        console.log("Publish status toggled");
        window.location.reload();
      } else {
        console.error("Failed to toggle publish status");
      }
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        console.log("Post deleted");
        window.location.reload();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <Link to={`/posts/${post.id}`}>
          <img className="rounded-t-lg" src={post.img} alt="" />
        </Link>
        <div className="p-5">
          <Link to={`/posts/${post.id}`}>
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              {post.title}
            </h5>
          </Link>
          <p className="font-normal text-gray-700 mb-3">
            {post.content.slice(0, 100)}...
          </p>
          {isAuthor ? (
            <div className="flex gap-2">
              <Link
                to={`/admin/${post.id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              >
                Edit
              </Link>
              <button
                onClick={togglePublish}
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              >
                {post.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={deletePost}
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/posts/${post.id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
