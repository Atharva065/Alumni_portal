const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./src/config.env" });

const TOKEN = process.env.SECRET;

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "TOKEN");
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!admin) {
      throw new Error();
    }
    req.token = token;
    req.admin = admin;
    next();
  } catch (e) {
    // console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = adminAuth;
