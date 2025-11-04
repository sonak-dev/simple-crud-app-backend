import Product from "../models/product.model.js";


const getProducts = async (req, res) => {
    try{
        const products = await Product.find();

        if(!products){
            console.log("Product not found!");
        }

        res.status(200).json(products);
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


const getProduct = async (req, res) => {

    try{

        const { id } = req.params;

        const product = await Product.findById(id);

        res.status(200).json(product);

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }

}


const createProduct = async (req, res) => {
    
    try{

        const product = await Product.create(req.body);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Failed to create product"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server error while creating product",
            error: err.message
        });
    }

}


const updateProduct = async (req, res) => {

    try{

        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id, 
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server error while creating product",
            error: err.message
        });
    }

}


const deleteProduct = async (req, res) => {

    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: err.message
        });
    }

}


export{
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};