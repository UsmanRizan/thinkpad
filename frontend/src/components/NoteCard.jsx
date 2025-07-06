import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

function NoteCard({ note, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm(`Are you sure you want to delete this note?`)) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 border-t-4 border-solid border-[#237a37] hover:border-[#42cc9e]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="badge badge-outline text-xs text-base-content/70">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="w-4 h-4 text-base-content/70" />
            <button
              className="btn btn-ghost btn-xs text-base-content/70 hover:text-blue-500 transition-colors duration-200"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="w-4 h-4 text-base-content/70 hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
