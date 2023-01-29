const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config.env" });

// dotenv.config();

const DB = process.env.MONGODB;
console.log("DB", DB);
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Success");
  })
  .catch(() => console.log("Failed"));
// const mongoose = require("mongoose");
// mongoose
// .connect(
//   "mongodb+srv://Admin:DJE5xvKbEnspCZ8s@cluster0.rgtgrks.mongodb.net/?retryWrites=true&w=majority",
//   // "mongodb+srv://Admin:DJE5xvKbEnspCZ8s@cluster0.rgtgrks.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// )
// .then(() => {
//   console.log("Success");
// })
// .catch(() => console.log("Failed"));
