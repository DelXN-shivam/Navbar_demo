import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },  // Ensure this is a string, not ObjectId
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
