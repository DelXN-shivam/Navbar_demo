import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Product from "../../../models/product";

export async function POST(request) {
    const { title, description, image, category } = await request.json();
    await connectMongoDB();
    await Product.create({ title, description, image, category });
    return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
}

export async function GET(request) {
    await connectMongoDB();
    const products = await Product.find();
    return NextResponse.json({ products });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Product Deleted' }, { status: 200 });
}

