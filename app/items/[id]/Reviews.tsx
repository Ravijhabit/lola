import { SelectReviews } from "@/db/schema";
import { FaUser } from "react-icons/fa";
import styles from "./page.module.css";
export default function Reviews({ reviews }: { reviews: SelectReviews[] }) {
  return (
    <section className={styles.review}>
      {reviews?.map((review) => (
        <section key={review.id} className={styles.review}>
          <FaUser />
          {/* comment */}
          <p>{review.rating}</p>
          <p>{review.review}</p>
        </section>
      ))}
    </section>
  );
}
