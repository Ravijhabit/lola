"use client";

import { SelectProducts, SelectUsers } from "@/db/schema";
import { useState } from "react";
import ChatComponent from "./ChatComponent";
import ProductDescription from "./ProductDescription";
import styles from "./page.module.css";

export default function Controller({
  id,
  product,
  seller,
}: {
  id: string;
  product: SelectProducts;
  seller: SelectUsers;
}) {
  const [openChat, setOpenChat] = useState(false);

  async function handleTnx() {}

  return (
    <section className={styles.controller}>
      {/* Product Description and Buy/Negotiate button */}
      <ProductDescription product={product} seller={seller} />
      {product.type === "trade" ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            console.log("Negotiate");
            setOpenChat(true);
          }}
        >
          Negotiate
        </button>
      ) : (
        <button
          className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5"
          type="button"
          onClick={handleTnx}
        >
          {product.type.toUpperCase()}
        </button>
      )}
      {openChat ? (
        <section className={styles.chatHandler}>
          <ChatComponent sellerId={product.seller} />
        </section>
      ) : null}
    </section>
  );
}
