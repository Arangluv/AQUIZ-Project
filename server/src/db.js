import mongoose from "mongoose";
require("dotenv").config();
console.log(process.env.DB_HOST);
mongoose.connect("mongodb://127.0.0.1:27017/aquiz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () =>
  console.log("Database connection has been succeeded 🟢");

db.on("error", (error) => console.log("DB connect error 🔴", error));
db.once("open", handleOpen);
