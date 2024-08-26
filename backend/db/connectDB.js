// mongodb.js
import mongoose from 'mongoose';

const connectmongodb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected: " + conn.connection.host);
  } catch (e) {
    console.log("Error => " + e);
    process.exit(1);
  }
};

export default connectmongodb;
