const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
      name: "Task API",
      version: "1.0",
      endpoints: ["/tasks"]
    });
  });
  
  // Health endpoint
  app.get("/health", (req, res) => {
    res.json({
      status: "ok"
    });
  });

module.exports = app;