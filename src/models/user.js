import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  beersTaken: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beer',
    },
  ],
});

export default mongoose.model('User', userSchema);
