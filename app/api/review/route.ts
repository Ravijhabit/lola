import db from "@/db";
import { products, reviews } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

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
    const { product, rating, review } = data;

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
        { message: "You cannot review your own product", success: false },
        { status: 403 }
      );

    if (rating < 0 || rating > 5)
      return NextResponse.json(
        { message: "Rating should be between 0 and 5", success: false },
        { status: 422 }
      );

    const reviewExists = await db
      .select()
      .from(reviews)
      .where(
        and(
          eq(reviews.product, productExists.id),
          eq(reviews.buyer, session.user.id)
        )
      );

    if (reviewExists.length)
      return NextResponse.json(
        { message: "You have already reviewed this product", success: false },
        { status: 403 }
      );

    await db.insert(reviews).values({
      product,
      buyer: session.user.id,
      rating,
      review: review?.trim(),
    });

    return NextResponse.json({
      message: "Review added",
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
