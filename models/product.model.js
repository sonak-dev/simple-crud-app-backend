import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

  product_Name: { 
    type: String,
    required: [true, "Product Name is required"]
  },

  quantity: { 
    type: Number,
    required: [true, "Quantity is required"],
    default: 0
  },

  price: { 
    type: Number,
    required: [true, "Price is required"],
    default: 0
  },

  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Books", "Home", "Other"],
    default: "Other",
  },

  inStock: { 
      type: Boolean, 
      default: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Name is required"],
  },

  updatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

}, { timestamps: true });


const Product = mongoose.model("Product", productSchema);

export default Product;