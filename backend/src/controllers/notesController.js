import e from "express";
import Note from "../models/Note.js";

export async function getNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error getNotes Controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    console.error("Error createNotes Controller:", error.message);
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (updatedNote === null) {
      return res
        .status(404)
        .json({ message: `Note with id ${req.params.id} not found!` });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updateNote Controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (deletedNote === null) {
      return res
        .status(404)
        .json({ message: `Note with id ${req.params.id} not found!` });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleteNote Controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res
        .status(404)
        .json({ message: `Note with id ${req.params.id} not found!` });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error getNoteById Controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
