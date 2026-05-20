import dotenv from "dotenv";

import app from "./app.js";

import { connectDB } from "../shared/config/db.js";

dotenv.config();

const PORT = process.env.API_PORT || 5000;

const startServer = async () => {

  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `API server running on ${PORT}`
    );
  });

};

startServer();