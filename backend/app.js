const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const productRouter = require("./routers/productRouter");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const main = async () => {
  await mongoose.connect(MONGO_DB_URL);
};

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/product", productRouter);


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let { status = 500, message = "some error" } = err;
  res.status(status).json({ message, isSuccess: false });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
