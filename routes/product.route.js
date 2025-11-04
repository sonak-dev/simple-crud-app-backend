import { Router } from "express";
import { 
    createProduct, 
    deleteProduct, 
    getProduct, 
    getProducts, 
    updateProduct 
} from "../controllers/product.controller.js";



const productRoute = Router();

// Get All Poduct Information
productRoute.get(`/`, getProducts);

// Get Data based on id
productRoute.get(`/:id`, getProduct);

productRoute.post(`/`, createProduct);

productRoute.put(`/:id`, updateProduct);

productRoute.delete(`/:id`, deleteProduct);


export default productRoute;