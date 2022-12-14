import express from "express";
import http from "http";
import db from "./db.js";
import router from "./routes.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

db.connection.on("connecting", () => console.log("Connecting to database..."));
db.connection.on("error", () => console.log("Connection failed"));

db.connection.once("connected", () => {
  server.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
});
