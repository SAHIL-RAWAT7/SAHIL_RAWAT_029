import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    default: null
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

blogSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'authorId',
    select: 'name email'
  });
  next();
});

export default mongoose.model('Blog', blogSchema);