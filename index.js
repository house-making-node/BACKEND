// const express = require('express')   // common JS
import express from "express"; // ES6
import { tempRouter } from "./src/routes/temp.route.js";
import { faqRouter } from "./src/routes/faq.route.js";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

// router setting
app.use("/temp", tempRouter);
app.use("faq", faqRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
