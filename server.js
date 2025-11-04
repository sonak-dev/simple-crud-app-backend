import express from "express";

// ✅ Config
import { PORT, DB_URI } from "./config/env.js";

// ✅ Routes
import productRoute from "./routes/product.route.js";

// ✅ Database connection
import connectToDatabase from "./database/mongodb.js";

const app = express();


// ✅ Middleware (Modern way — no need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * ✅ API Routes
 * ✅ Each router handles a specific feature:
 */
app.use("/api/products", productRoute);


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello, and Welcome to our new Node API!");
});


// ✅ Start server only after DB connects
const startServer = async () => {
  try {
    await connectToDatabase(DB_URI);
    console.log("✅ MongoDB connected successfully!");

    app.listen(PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${PORT || 5000}`);
    });
  } catch (err) {
    console.log("❌ Could not start server:", err);
  }
};

startServer();