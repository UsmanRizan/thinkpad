
import express from 'express';
import { createNotes, deleteNote, getNotes, updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get("/", getNotes)

router.post("/",createNotes)

router.put("/:id",updateNote)

router.delete("/:id",deleteNote)

export default router;

// router.get("/api/notes",(req,res)=>{
//     res.send("your notes are here");
// })

// router.post("/api/notes",(req,res)=>{
//     res.status(201).json({message:"Note created successfully!"})
// })
// //update a note
// router.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:`Note with id ${req.params.id} updated successfully!`})
// })
// //delete a note

// router.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:`Note with id ${req.params.id} deleted successfully!`})
// })