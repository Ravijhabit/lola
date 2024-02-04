"use client";

import ChatComponent from "@/app/component/chat/page";
import { useState } from "react";
import { HiMiniMinusCircle } from "react-icons/hi2";
import ProductDescription from "./ProductDescription";
// components
import ReviewRating from "./ReviewRating";
// styles
import styles from "./page.module.css";

export default function Controller({ id }: { id: string }) {
  const [modalOpen, setModalOpen] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  const stub = {
    productName: "Sofia",
    productDescription: "rich text format",
    productPrice: "3000",
    productType: "trade",
    productTag: "sports",
    seller: {
      id: "1",
      // all the profile of seller
    },
  };
  return (
    <main>
      <section
        className={[
          styles.productDetails,
          `${modalOpen ? styles.open : ""}`,
        ].join(" ")}
      >
        {modalOpen ? (
          <HiMiniMinusCircle
            style={{ cursor: "pointer" }}
            onClick={() => setModalOpen(0)}
          />
        ) : null}
        <div
          className={modalOpen === 1 ? styles.selected : ""}
          style={{ background: "red", cursor: "pointer" }}
          onClick={() => {
            setModalOpen(1);
          }}
          onKeyDown={() => {
            setModalOpen(1);
          }}
        >
          Product Description
          {modalOpen === 1 ? <ProductDescription stub={stub} /> : null}
        </div>
        <div
          className={modalOpen === 2 ? styles.selected : ""}
          style={{ background: "emerald", cursor: "pointer" }}
          onClick={() => setModalOpen(2)}
          onKeyDown={() => {
            setModalOpen(2);
          }}
        >
          Review
          {modalOpen === 2 ? <ReviewRating id={id} /> : null}
        </div>
        {stub?.productType === "trade" ? (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
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
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => console.log("We bought it")}
          >
            Buy
          </button>
        )}
      </section>
      {openChat ? (
        <section className={styles.chatHandler}>
          <ChatComponent sellerId={stub?.seller} />
        </section>
      ) : null}
    </main>
  );
}
