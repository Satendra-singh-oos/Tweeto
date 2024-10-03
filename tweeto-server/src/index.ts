import { initServer } from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

async function init() {
  const app = await initServer();
  app.listen(8000, () => console.log("Server started at port:8000"));
}

init();
