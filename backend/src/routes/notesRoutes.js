import express from "express"; 
import { createNote, deleteNotes, getAllNotes, updateNotes, getSpecificNotes } from "../controllers/notesControllers.js" 

const routeS = express.Router(); 

// CRUD
routeS.post("/", createNote);
routeS.get("/", getAllNotes); 
routeS.get("/:id", getSpecificNotes); 
routeS.put("/:id",updateNotes); 
routeS.delete("/:id",deleteNotes); 

export default routeS; 

