import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    category: {
      type: String,
      enum: ["Electronics", "Clothing", "Books", "Home", "Other"],
      default: "Other"
    },

    inStock: {
        type: Boolean,
        default: true
    },


}, { timestamps : true } );


const Product = mongoose.model("Product", productSchema);

export default Product;