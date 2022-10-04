import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/userRoutes.js";
//RWQlboMPy3N2qNiN

const app = express();

const CONNECTION_URL =
  "mongodb+srv://admin:RWQlboMPy3N2qNiN@cluster0.duptlyh.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//set all the routes inside the posts.js file
//reach the posts api by base url (http://localhost:5000/posts)
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
