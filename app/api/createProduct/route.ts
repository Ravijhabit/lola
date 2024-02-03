import db from "@/db";
import { products } from "@/db/schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

interface DrizzleError {
  message: string;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Not Signed in
    if (!session || !session.user || !session.user.id)
      return NextResponse.json(
        { message: "Not signed in", success: false },
        { status: 401 }
      );

    const data = await request.json();

    // TODO: image upload and store
    const { name, description, price, type, tag, seller } = data;

    await db.insert(products).values({
      name,
      description,
      price,
      type,
      seller,
      tag,
    });

    return NextResponse.json({ message: "Product added", success: true });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: (e as DrizzleError)?.message || "Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
