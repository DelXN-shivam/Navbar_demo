import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        title: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;