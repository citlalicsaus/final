import mongoose from 'mongoose';

export default function dbConnect() {
  mongoose.connect(
    'mongodb+srv://rakirox:1234567890@prueba-99adx.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true },
  );
}

export const SECRET = 'askjf3njnri3infsi3838fn91291n1n91d9d3nu3jf3ij92i93';
export const SALTINESS = 8;
