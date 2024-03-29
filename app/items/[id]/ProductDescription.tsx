import { SelectProducts, SelectUsers } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
export default function ProductDescription({
  product,
  seller,
}: {
  product: SelectProducts;
  seller: SelectUsers;
}) {
  return (
    <section className={styles.productDescription}>
      <h2 className="text-3xl font-bold">{product.name}</h2>
      <br />
      <p>{product.description}</p>
      <br />
      <p>Price: ${product.price}</p>
      <br />
      <strong>Tag: </strong>
      {product.tag}
      <div className="flex gap-2 items-center">
        <h5>By: </h5>
        <Link href={`/users/${seller.id}`} className="flex gap-2 items-center">
          <Image
            src={seller.image ?? ""}
            alt={seller.name ?? ""}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p>{seller.name}</p>
        </Link>
      </div>
    </section>
  );
}
