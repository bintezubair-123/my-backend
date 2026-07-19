const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


const tasks = [
  {
    id: 1,
    title: "Learn Express",
    done: false,
  },
  {
    id: 2,
    title: "Build Task API",
    done: true,
  },
  {
    id: 3,
    title: "Test with curl",
    done: false,
  },
];

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
  app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET task by ID
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  res.json(task);
});

module.exports = app;