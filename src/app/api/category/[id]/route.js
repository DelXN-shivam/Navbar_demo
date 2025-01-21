import Category from "@/models/category";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, { title });
    return NextResponse.json({ message: "Category Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const categories = await Category.findOne({ _id: id });
    return NextResponse.json({ categories }, { status: 200 });
}

