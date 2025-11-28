import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../components/Loader";

function EditPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isLoading, setisLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPublished: false,
    img: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      setisLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts/${postId}`
        );
        const data = await response.json();
        if (response.ok) {
          setFormData({
            title: data.title,
            content: data.content,
            isPublished: data.isPublished,
            img: data.img,
          });
        } else {
          console.error("Failed to fetch post.");
        }
        setisLoading(false);
      } catch (err) {
        setisLoading(false);
        console.error("Error fetching post, ", err);
      }
    };
    fetchPost();
  }, [postId]);

  const editPost = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("isPublished", formData.isPublished);
    data.append("img", formData.img);

    try {
      const res = await fetch(`http://localhost:8080/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      if (res.ok) {
        navigate("/admin");
      } else {
        console.error("Failed to create post");
      }
      setisLoading(false);
    } catch (err) {
      console.error(err);
      setisLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a New Post</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={editPost} className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border border-gray-500"
          />

          <label htmlFor="img">Upload Image</label>
          {formData.img && typeof formData.img === "string" && (
            <img
              src={formData.img}
              alt="Current"
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          )}
          <input
            type="file"
            id="img"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, img: e.target.files[0] }))
            }
            className="border border-gray-500 p-2 cursor-pointer"
          />

          <label htmlFor="content">Content</label>
          <Editor
            required
            id="content"
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={formData.content}
            onEditorChange={(content) =>
              setFormData((prev) => ({ ...prev, content: content }))
            }
            init={{
              height: 450,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
          />

          <label>
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isPublished: e.target.checked,
                }))
              }
            />
            Publish
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Post
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPage;
