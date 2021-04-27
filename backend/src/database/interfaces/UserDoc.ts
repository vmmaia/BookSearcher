import mongoose from 'mongoose';

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  refreshToken?: string;
}

export default UserDoc;
