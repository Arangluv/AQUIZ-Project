import mongoose from "mongoose";
require("dotenv").config();
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(process.env.DB_HOST);

const db = mongoose.connection;

const handleOpen = () =>
  console.log("Database connection has been succeeded 🟢");

db.on("error", (error) => console.log("DB connect error 🔴", error));
db.once("open", handleOpen);
