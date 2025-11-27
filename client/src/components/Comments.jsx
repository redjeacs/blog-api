import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authProvider";

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { postId } = useParams();
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/posts/${postId}/comments`
        );
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (err) {
        console.error("Error fetching comments: ", err);
      }
    };
    fetchComments();
  }, [post]);

  async function createComment(e) {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to leave a comment");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: comment,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments([...comments, data.comment]);
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment: ", err);
    }
  }
  return (
    <div>
      <form
        onSubmit={createComment}
        className="flex flex-col lg:w-3/4 gap-2 mb-8"
      >
        <label htmlFor="text" className="lg:text-2xl font-bold mb-4">
          Leave a Comment{" "}
        </label>
        <textarea
          name="text"
          id="text"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded-md p-2 bg-transparent border-gray-400 outline-1 outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
        ></textarea>
        <button
          type="submit"
          className="self-end bg-blue-600 p-2 text-white rounded-md cursor-pointer"
        >
          Submit
        </button>
      </form>
      <h1 className="lg:text-2xl font-bold mb-4">Comments</h1>
      {comments &&
        comments.map((comment) => (
          <div
            key={comment.id}
            className="mb-4 border border-gray-400 p-4 rounded-md bg-transparent"
          >
            <div className="font-semibold flex gap-2">
              <p>{comment.user.username}</p>-
              <p className="text-gray-500 text-sm">
                {comment.formattedCreatedAt}
              </p>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
    </div>
  );
}

export default Comments;
