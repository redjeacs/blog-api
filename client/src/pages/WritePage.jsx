import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../components/Loader";

function WritePage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPublished: false,
  });

  const createPost = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("isPublished", formData.isPublished);
    data.append("img", formData.img);

    try {
      const res = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
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
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a New Post</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={createPost} className="flex flex-col gap-2">
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
          <input
            required
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

export default WritePage;
