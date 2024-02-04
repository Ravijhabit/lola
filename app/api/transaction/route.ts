import db from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
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

    const { product, rentedTill } = data;

    const productExists = await db.query.products.findFirst({
      where: eq(products.id, product),
    });

    if (!productExists)
      return NextResponse.json(
        { message: "Product does not exist", success: false },
        { status: 404 }
      );

    if (productExists.seller === session.user.id)
      return NextResponse.json(
        { message: "You cannot transact your own product", success: false },
        { status: 403 }
      );

    await db
      .update(products)
      .set({ rentedTill })
      .where(eq(products.id, product));

    return NextResponse.json({
      message: "Successful",
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
