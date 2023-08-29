import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: 'string',
    required: true,
    unique: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  social: {
    type: 'string',
    required: true,
    unique: true,
  },
});

export default mongoose.model('User', userSchema);
