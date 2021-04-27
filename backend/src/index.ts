import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  /*
    1 - Check environment variables
    2 - Connect to database
    3 - Handle gracefull shutdown
    4 - Start server listening
  */

  // TEMP!!!!! SET IN KUBERNETES
  //process.env.JWT_KEY = 'JWT_KEY';
  //process.env.JWT_REFRESH_KEY = 'JWT_REFRESH_KEY';
  //process.env.JWT_EXPIRES_IN = '15m';
  //process.env.MONGO_URI = 'mongodb://192.168.1.250:27017/backend';

  try {
    // 1
    const SERVER_PORT = process.env.SERVER_PORT || 5000;

    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.JWT_REFRESH_KEY) {
      throw new Error('JWT_REFRESH_KEY must be defined');
    }
    if (!process.env.JWT_EXPIRES_IN) {
      throw new Error('JWT_EXPIRES_IN must be defined');
    }
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }

    // 2
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    // 3
    process.on('SIGTERM', async () => {
      await mongoose.disconnect();
    });
    process.on('SIGINT', async () => {
      await mongoose.disconnect();
    });

    // 4
    app.listen(SERVER_PORT, () =>
      console.log(`Backend listening on port ${SERVER_PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
