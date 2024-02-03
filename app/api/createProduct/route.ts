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
    if (!session?.user || !session.user.id)
      return NextResponse.json(
        { message: "Not signed in", success: false },
        { status: 401 }
      );

    const data = await request.json();

    // TODO: image upload and store
    const { name, description, price, type, tag, seller } = data;

    const returned = await db
      .insert(products)
      .values({
        name,
        description,
        price,
        type,
        seller: session.user.id,
        // seller,
        tag,
      })
      .returning({ id: products.id });

    return NextResponse.json({
      productId: returned[0].id,
      message: "Product added",
      success: true,
    });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: (e as DrizzleError)?.message || "Error",
        success: false,
      },
      { status: (e as DrizzleError)?.message ? 422 : 500 }
    );
  }
}
