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
// POST create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Validate input
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  // Generate the next ID
  const nextId =
    tasks.length > 0
      ? Math.max(...tasks.map(task => task.id)) + 1
      : 1;

  
  const newTask = {
    id: nextId,
    title: title.trim(),
    done: false,
  };


  tasks.push(newTask);


  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  // Task not found
  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  const { title, done } = req.body;

  // Validate request body
  if (
    (title === undefined && done === undefined) ||
    (title !== undefined && title.trim() === "") ||
    (done !== undefined && typeof done !== "boolean")
  ) {
    return res.status(400).json({
      error: "Invalid request body",
    });
  }

  // Update fields if provided
  if (title !== undefined) {
    task.title = title.trim();
  }

  if (done !== undefined) {
    task.done = done;
  }

  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  // Task not found
  if (index === -1) {
    return res.status(404).json({
      error: `Task ${id} not found`,
    });
  }

  // Remove task
  tasks.splice(index, 1);

  // 204 No Content
  res.status(204).send();
});

module.exports = app;