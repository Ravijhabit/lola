import db from "@/db";
import { history, products } from "@/db/schema";
import { eq } from "drizzle-orm";
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

    const { product, myProduct, rentedFrom, rentedTill } = data;

    const productExists = await db.query.products.findFirst({
      where: eq(products.id, product),
    });

    if (!productExists?.id)
      return NextResponse.json(
        { message: "Selected product does not exist", success: false },
        { status: 404 }
      );

    if (productExists.seller === session.user.id)
      return NextResponse.json(
        { message: "You cannot transact your own product", success: false },
        { status: 403 }
      );

    if (product.type === "rent") {
      if (
        productExists.rentedTill &&
        new Date(productExists.rentedTill) > new Date()
      )
        return NextResponse.json(
          { message: "Selected product is already rented", success: false },
          { status: 403 }
        );

      await db
        .update(products)
        .set({ rentedTill })
        .where(eq(products.id, product));

      await db.insert(history).values({
        product,
        buyer: session.user.id,
        rentedFrom,
        rentedTill,
      });

      return NextResponse.json({
        message: "Successful",
        success: true,
      });
    }

    if (product.type === "trade") {
      const myProductExists = await db.query.products.findFirst({
        where: eq(products.id, myProduct),
      });

      if (!myProductExists?.id)
        return NextResponse.json(
          { message: "Your product does not exist", success: false },
          { status: 404 }
        );

      await db
        .update(products)
        .set({ bartered: true, seller: session.user.id })
        .where(eq(products.id, product));

      await db
        .update(products)
        .set({ bartered: true, seller: productExists.seller })
        .where(eq(products.id, myProduct));

      return NextResponse.json({
        message: "Successful",
        success: true,
      });
    }

    return NextResponse.json(
      { message: "Invalid product type", success: false },
      { status: 422 }
    );
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
