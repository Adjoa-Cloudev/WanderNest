import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['tourist', 'tour_operator'],
    required: true
  },
  fullName: {
    type: String,
    required: function () { return this.userType === 'tourist'; }
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: function () { return this.userType === 'tourist'; }
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: false 
  },
  businessName: {
    type: String,
    required: function () { return this.userType === 'tour_operator'; }
  },
  location: {
    type: String,
    required: function () { return this.userType === 'tour_operator'; }
  },
  servicesDescription: {
    type: String,
    required: function () { return this.userType === 'tour_operator'; }
  },
  rateCard: {
    type: String,
    required: function () { return this.userType === 'tour_operator'; }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// userSchema.plugin(normalize);
export default User;
