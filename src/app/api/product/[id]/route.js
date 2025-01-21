import Product from "../../../../models/product";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = await params;
    const { newTitle: title, newDescription: description, newImage: image, newCategory: category } = await request.json();
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, { title, description, image, category });
    return NextResponse.json({ message: "Product Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = await params;
    await connectMongoDB();
    const products = await Product.findOne({ _id: id });
    return NextResponse.json({ products }, { status: 200 });
}

