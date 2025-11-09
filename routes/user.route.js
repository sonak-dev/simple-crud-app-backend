// Importing Router from express
import { Router } from "express";

// Importing controller functions
import { 
    signupUser,    // Create new user
    loginUser,     // Login user
} from "../controllers/user.controllers.js";


const userRoute = Router();

// =============================
// 👤 User API Routes
// =============================

// POST /signup → Register a new user
userRoute.post("/signup", signupUser);

// POST /login → Login user
userRoute.post("/login", loginUser);

export default userRoute;
