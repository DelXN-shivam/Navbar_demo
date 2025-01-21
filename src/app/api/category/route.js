import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Category from "../../../models/category";

export async function POST(request) {
    const { title } = await request.json();
    await connectMongoDB();
    await Category.create({ title });
    return NextResponse.json({ message: "Category created successfully" }, { status: 201 });
}

export async function GET(request) {
    await connectMongoDB();
    const categories = await Category.find();
    return NextResponse.json({ categories });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Category Deleted' }, { status: 201 });
}

