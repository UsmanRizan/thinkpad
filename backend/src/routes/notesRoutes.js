import express from "express";
import {
  createNotes,
  deleteNote,
  getNotes,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteById);

router.post("/", createNotes);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
