import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rateCard: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String, // single image URL
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  }
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;
