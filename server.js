import express from "express";

// ✅ Config
import { PORT } from "./config/env.js";

// ✅ Routes
import productRoute from "./routes/product.route.js";

// ✅ Database connection
import connectToDatabase from "./database/mongodb.js";


const app = express();


// ✅ Middleware (Modern way — no need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello, and Welcome to our new Node API!");
});


// ✅ Start server only after DB connects
/**
 * 🚀 Initialize Server
 * -------------------------------------
 * 1️⃣ Connect to MongoDB
 * 2️⃣ Register all API routes only after DB connection
 * 3️⃣ Start Express server
 * -------------------------------------
 * This ensures no route executes before database is ready,
 * preventing buffering or timeout errors.
 */
const startServer = async () => {
  try {
    await connectToDatabase();

    // ✅ Register routes only after DB connection
    app.use("/api/products", productRoute);

    app.listen(PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${PORT || 5000}`);
    });
  } catch (err) {
    console.log("❌ Could not start server:", err);
  }
};

startServer();