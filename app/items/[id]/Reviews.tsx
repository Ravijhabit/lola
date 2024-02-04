import db from "@/db";
import { SelectReviews, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import styles from "./page.module.css";
export default async function Reviews({
  reviews,
}: {
  reviews: SelectReviews[];
}) {
  return (
    <section className={styles.reviewContainer}>
      {reviews?.map(async (review) => {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, review.buyer));

        return (
          <section key={review.id} className={styles.review}>
            <div className={styles.userInfo}>
              <Image
                width={30}
                height={30}
                src={user[0].image ?? ""}
                alt={user[0].name ?? ""}
                className="rounded-full"
              />
              {user[0].name}:
            </div>
            <div className={styles.comments}>
              {/* comment */}
              <p>{review.rating} Stars - </p>
              <p>{review.review}</p>
            </div>
          </section>
        );
      })}
    </section>
  );
}
