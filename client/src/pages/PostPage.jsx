import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Comments from "../components/Comments";
import Errors from "../components/Errors";

function PostPage() {
  const [post, setPost] = useState(null);
  const [errors, setErrors] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setErrors("");
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}`
        );
        const data = await response.json();
        if (response.ok) {
          setPost(data);
        } else {
          setErrors("Failed to fetch post.");
        }
      } catch (err) {
        setErrors("Error fetching post.");
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div className="flex-col gap-8 w-4/5 mx-auto my-8">
      {errors ? (
        <Errors errors={errors} />
      ) : post ? (
        <div className="flex flex-col gap-8">
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
            <div className="hidden lg:block w-full">
              <img
                src={post.img}
                alt=""
                className="rounded-2xl object-cover w-full h-full"
              />
            </div>
          )}
          <div className="lg:text-lg flex flex-col gap-6 text-justify">
            {post.content}
          </div>
          <div className="border-t border-black"></div>
          <Comments post={post} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default PostPage;
