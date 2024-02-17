require("dotenv").config();
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const router = require("./routes/productRoute");
const { errorMiddleware, notFound } = require("./middlewares/errorMiddleware");
server.use(express.json());

server.use("/api/products", router);

server.use(notFound);
server.use(errorMiddleware);

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server listening on 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
