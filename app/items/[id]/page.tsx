import db from "@/db";
import { reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Controller from "./Controller";
import Reviews from "./Reviews";
// import ReviewRating from "./ReviewRating";
import styles from "./page.module.css";

export interface IAppProps {
  params: { id: string };
}

export default async function Item(props: IAppProps) {
  // TODO: Handle product/seller not found

  const product = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.id, props.params.id),
    with: {
      seller: true,
    },
  });

  const seller = product[0].seller;

  const allReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.product, product[0].id));

  return (
    <main className={styles.item}>
      <section className={styles.productDetails}>
        {/* Hero Image */}
        <div className="w-full relative">
          <Image
            src={product[0].image}
            alt={product[0].name}
            objectFit="cover"
            fill
            className="w-full h-[50vh] object-cover"
          />
        </div>
        {/* Controller showing detais -> reason of passing is we want server component here. To make an api call and showcase the product that is selected. */}
        {/* Product  */}
        <Controller id={props.params.id} product={product[0]} seller={seller} />
      </section>
      {/* Review Section */}
      <section className={styles.reviews}>
        <div className={styles.heading}>Reviews</div>
        {/* send reviews as a parameter */}
        <Reviews reviews={allReviews} />
      </section>
    </main>
  );
}
