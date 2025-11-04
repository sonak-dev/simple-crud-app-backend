import express from "express";
import bodyParser from "body-parser";

// Here we import routes folder
import productRoute from "./routes/product.route.js";


// Connected to database 
import connectToDatabase from "./database/mongodb.js";


const app = express();
const PORT = 6500;
const DB_URI = "mongodb+srv://sonakjha369:Sonak%40%23%24123%2A%2A45@backenddb.gmutkuq.mongodb.net/Node-API?appName=BackendDB";



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
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        })

    }catch(err){
        console.log("❌ Could not start server:", err);
    }

}

startServer();