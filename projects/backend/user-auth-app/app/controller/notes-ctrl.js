// Import the Note model
import Note from '../models/note-model.js';

const notesCtrl = {}

// Define the notes controller object
// List all notes of a user

notesCtrl.list = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId });
        res.json(notes);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

notesCtrl.create = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = new Note({
      title,
      body,
      user: req.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

notesCtrl.show = async (req, res) => {
  const id = req.params.id
  try{
    const note = await Note.findOne({_id: id, user: req.userId})
    if (!note){
      res.status(404).json({})
    }
    res.json(note)
  } catch (err){
    console.log(err)
  }
}

notesCtrl.update = async (req, res) => {
  const id = req.params.id
  const body = req.body
  try {
    const note = await Note.findOneAndUpdate({_id: id, user: req.userId}, body, {new: true})
    if(!note){
      return res.status(400).json({})
    }
    res.json(note)
  } catch (err){
    res.json(err)
  }
}

notesCtrl.delete = async (req, res) => {
  try{
    const id = req.params.id
    let note
    if (req.role === 'admin' || req.role ==='moderator'){
      note = await Note.findByIdAndDelete(id)
    } else {
      note = await Note.findOneAndDelete({_id: id, user: req.userId})
    }
    if (!note){
      return res.status(404).json({})
    }
    res.json(note)
  } catch (err){
    res.json(err)
  }
}

export default notesCtrl