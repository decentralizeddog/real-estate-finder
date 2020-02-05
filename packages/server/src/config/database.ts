import { ConnectionOptions, connect } from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Database connecting ...');
    const production = process.env.NODE_ENV === 'production';
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    await connect(
      production ? process.env.MONGODB_URI : `mongodb://localhost/db_test`,
      options,
    );
    console.log('MongoDB connected!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
