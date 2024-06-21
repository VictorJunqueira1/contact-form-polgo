import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()

async function main() {
  if (process.env.MONGO_USER !== "" && process.env.MONGO_PASSWORD !== "") {
    await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`);
  }
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`);
  
}
main().then(() => { console.log("MongoDB rodando com sucesso.") }).catch(err => console.log(err));