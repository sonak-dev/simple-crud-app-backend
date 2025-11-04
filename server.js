import express from "express";
import bodyParser from "body-parser";

// Config
import { PORT, DB_URI } from "./config/evn.js";

// Here we import routes folder
import productRoute from "./routes/product.route.js";


// Connected to database 
import connectToDatabase from "./database/mongodb.js";


const app = express();


// Middleware
app.use(bodyParser.json());
// That's the old way
// app.use(express.urlencoded({ extended: true }));
// New and Modern way
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * API Routes
 * Each router handles a specific feature:
 */
app.use(`/api/products`, productRoute);



app.get(`/`, (req, res) => {
    // console.log("I will create our first server");
    res.send("Hello, and Welcome to our new Node API!");
});


// That is the best Practice to connect the database
const startServer = async () => {

    try{
        await connectToDatabase(DB_URI);

        // Step 2: Start server only after DB connects
        app.listen(PORT || 5000, () => {
            console.log(`🚀 Server running on http://localhost:${PORT || 5000}`);
        })

    }catch(err){
        console.log("❌ Could not start server:", err);
    }

}

startServer();