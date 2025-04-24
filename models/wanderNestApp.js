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
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available',
  }
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);



const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema)
export { Tour, Review }; 
