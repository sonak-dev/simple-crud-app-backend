// Importing Router from express for defining routes
import { Router } from "express";

// Importing controller functions that handle logic for each route
import { 
    createProduct,     // Function to add a new product
    deleteProduct,     // Function to delete a product by ID
    getProduct,        // Function to get a single product by ID
    getProducts,       // Function to get all products
    updateProduct      // Function to update product details
} from "../controllers/product.controller.js";


// Creating an instance of the Router
const productRoute = Router();


// =============================
// 🛍️ Product API Routes
// =============================

// GET / → Fetch all product information
productRoute.get(`/`, getProducts);

// GET /:id → Fetch a single product based on its ID
productRoute.get(`/:id`, getProduct);

// POST / → Create a new product entry
productRoute.post(`/`, createProduct);

// PUT /:id → Update product details by ID
productRoute.put(`/:id`, updateProduct);

// DELETE /:id → Remove a product by ID
productRoute.delete(`/:id`, deleteProduct);


// Exporting the router so it can be used in server.js
export default productRoute;