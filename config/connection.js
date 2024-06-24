import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

main()
  .then(() => {
    console.log("MongoDB rodando com sucesso.");
  })
  .catch((err) => console.log(err));

async function main() {
  if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
    await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, {});
  } else {
    await mongoose.connect(`mongodb://127.0.0.1:27017/db_conection`, {});
  }
}