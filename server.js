const express = require("express");
const swaggerUi = require("swagger-ui-express");

const app = require("./src/app");
const openapi = require("./task-api/openapi.json");

const PORT = process.env.PORT || 3000;

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/docs`);
});