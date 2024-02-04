import Item from "@/app/component/Item";
import db from "@/db";
import { products, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import styles from "./profile.module.css";

export interface ProfileProps {
  params: { user: string };
}
export default async function Profile(props: ProfileProps) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, props.params.user));

  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.seller, user[0].id));

  return (
    <main className={styles.container}>
      <Image
        src={user[0].image ?? ""}
        alt={user[0].name ?? ""}
        width={100}
        height={100}
        className="rounded-full"
      />
      <div className={styles.title}>
        <div className={styles.value}>{user[0].name}</div>
      </div>
      <div className={styles.title}>
        <div className={styles.value}>{user[0].email}</div>
      </div>

      {allProducts.map((item) => (
        <Item item={item} />
      ))}
    </main>
  );
}
