import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);

      if (error.response.status === 429) {
        toast.error("Too many requests. Please try again later.", {
          duration: 4000,
          icon: "☠️",
        });
        return;
      } else {
        toast.error("Failed to create note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-base-200">
        <div className="mx-auto container px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Link to={"/"} className="btn btn-ghost mb-4">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter note title"
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="textarea textarea-bordered w-full"
                      placeholder="Enter note content"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary btn-outline"
                    >
                      {loading ? "Creating..." : "Create Note"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
