import mongoose from "mongoose";
require("dotenv").config();
mongoose.connect(
  "mongodb+srv://ruhunsu3:ufRpv80XhNgeKPNn@aquiz-cluster.hj6milq.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
console.log(process.env.DB_HOST);

const db = mongoose.connection;

const handleOpen = () =>
  console.log("Database connection has been succeeded 🟢");

db.on("error", (error) => console.log("DB connect error 🔴", error));
db.once("open", handleOpen);
