import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.dbURL as string);

    app.listen(config.port, () => {
      console.log(`Example app listening on Port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
