import mongoose from 'mongoose';

import UserAttrs from './UserAttrs';
import UserDoc from './UserDoc';

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export default UserModel;
