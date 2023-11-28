import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

export default mongoose.model('File', fileSchema);
