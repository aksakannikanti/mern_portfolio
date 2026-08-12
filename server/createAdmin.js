const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
    });

    console.log("Admin Created");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });