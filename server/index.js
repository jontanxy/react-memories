import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;
// const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@react-memories.xdcn8.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => {
    console.error(error);
  });

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Memories API🤟🏻🌎",
  });
});

app.use("/posts", postRoutes);

export default app;
