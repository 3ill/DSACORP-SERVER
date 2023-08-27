import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
});

export default mongoose.model('Subscribers', subscribeSchema);
