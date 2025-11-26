import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

function PostPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}`
        );
        const data = await response.json();
        if (response.ok) {
          setPost(data);
        } else {
          console.error("Failed to fetch post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  console.log(post);
  return (
    <div className="flex flex-col gap-8">
      {post ? (
        <div className="flex gap-8">
          <div className="lg:w-3/5 flex flex-col gap-8">
            <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Written by</span>
              <Link className="text-blue-800">{post.user.username}</Link>
              <span>on</span>
              <Link className="text-blue-800">Category</Link>
              <span>{post.formattedCreatedAt}</span>
            </div>
          </div>
          {post.img && (
            <div className="hidden lg:block w-2/5">
              <img src={post.img} alt="" w="600" className="rounded-2xl" />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default PostPage;
