import Notes from "../models/Notes.js" 


export async function getAllNotes(req,res){

    try{ 
        const notes = await Notes.find().sort({createdAt:-1}); //sort() --> newest first
        res.status(200).send(notes); 

    }catch(error){ 
        console.error("Error in get all notes",error)
        return res.status(500).json({message:"Internal server error"})

    }
}; 

export async function createNote(req,res){ 
    try{ 
        const {title,content} = req.body; 
        const newNote = new Notes({title,content}); 

        const savedNote = await newNote.save();  
        return res.status(201).json(savedNote);  
        
    }catch(error){ 
        console.error("Error in createNote controller", error); 
        return res.status(500).json({message:"Internal Server Error"});
    }
}



export const updateNotes = async(req,res) => { 
    try{
    const {title,content} = req.body; 
    const updatedNote = await Notes.findByIdAndUpdate(
        // pass the id using request.params.any_name_here, and the fields that we'd like to update
        req.params.id, 
        {title,content}, 
        {new:true});

    if(!updatedNote){ 
        return res.status(404).json({message: "Note not found"}); 
    }
    return res.status(200).json({message:"Note updated successfully"}); 

}catch(error){ 
    console.error("Error in updateNotes controller",error); 
    return res.status(500).json({message:"Internal Server Error"}); 
}

}



export async function deleteNotes(req,res){ 
try{ 
    const deletedNotes = await Notes.findByIdAndDelete(req.params.id);
    if(!deletedNotes){
            return res.status(404).json({message:"Note not found"}); 
        } 
    return res.status(200).json({message:"Note deleted Successfully!"}); 

    }catch(error){ 
        console.error("Error in deleteNotes controller", error); 
        return res.status(500).json({message:"Internal Server Error"}); 
    }

}

export async function getSpecificNotes(req,res) {
     
try{

    const getNotes = await Notes.findById(req.params.id); 
    if(!getNotes){ 
        return res.status(404).json({message:"Note does not exist"}); 
    }
    return res.status(200).json(getNotes); 

}catch(error){ 
    console.error("Error in getSpecificNotes controller", error); 
    return res.status(500).json({message:"Internal Server Error"}); 
}
} 
