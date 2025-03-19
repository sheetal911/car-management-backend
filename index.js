require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

// Use environment variables
const jwtSecret = process.env.JWT_SECRET; // JWT secret for authentication
const mongoURI = process.env.MONGO_URI;  // MongoDB connection URI from .env
const port = process.env.PORT || 5000;  // Port for the application (defaults to 5000)

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // OpenAPI Specification version
    info: {
      title: "Car Management API",
      version: "1.0.0",
      description: "API documentation for the car management application",
    },
  },
  apis: ["./routes/products.js"], // Path to your API routes (adjust as needed)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB Atlas Connection using the .env variable (no deprecated options)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/products", require("./routes/products")); // Update path as per your actual route file structure

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Set the port and start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
