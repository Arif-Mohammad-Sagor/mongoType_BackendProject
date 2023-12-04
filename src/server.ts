import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.dbURL as string);

  server = app.listen(config.port, () => {
      console.log(`Example app listening on Port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log(` unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException',()=>{
 console.log(` unahandledRejection is detected , shutting down ...`);
 process.exit(1);
})
