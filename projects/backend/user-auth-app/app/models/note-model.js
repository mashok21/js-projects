// Import necessary modules from mongoose
import { Schema, model } from 'mongoose';

// Define the schema for notes
const noteSchema = new Schema({
  title: String,
  body: String,
  user: Schema.Types.ObjectId,
});

// Create the Note model from the schema
const Note = model('Note', noteSchema);

// Export the Note model as the default export
export default Note;
