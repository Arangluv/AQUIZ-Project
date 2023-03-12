import "./db.js";
import app from "./server";
require("dotenv").config();
const PORT = process.env.SERVER_PORT;
console.log("PORT : ", PORT);
const handleListening = () => {
  console.log(`🟢 Server Listening on http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);
