"use client";

import { SelectProducts, SelectUsers } from "@/db/schema";
import axios from "axios";
import { useState } from "react";
import ChatComponent from "./ChatComponent";
import ProductDescription from "./ProductDescription";
import ReviewRating from "./ReviewRating";
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
  const [rentFrom, setRentFrom] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [rentTill, setRentTill] = useState("");

  const handleRentFromChange = (e) => {
    const selectedDate = e.target.value;
    // Ensure that rentFrom is not before the current date
    if (selectedDate >= getCurrentDate()) {
      setRentFrom(selectedDate);
    }
  };

  const handleRentTillChange = (e) => {
    const selectedDate = e.target.value;
    // Ensure that rentTill is not before rentFrom
    if (selectedDate >= rentFrom) {
      setRentTill(selectedDate);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month: string | number = today.getMonth() + 1;
    let day: string | number = today.getDate();

    // Add leading zero if month or day is less than 10
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  async function handleTnx() {
    const res = await axios.post("/api/transaction", {
      product: id,
      rentedTill: rentTill,
      rentedFrom: rentFrom,
    });
  }

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
        <>
          {product?.rentedTill &&
          new Date().toISOString().split("T")[0] < product?.rentedTill ? (
            <p>Not Available</p>
          ) : (
            <>
              <div>
                <label htmlFor="rentFrom">Rent from:</label>
                <input
                  type="date"
                  id="rentFrom"
                  value={rentFrom}
                  onChange={handleRentFromChange}
                  min={new Date().toISOString().split("T")[0]}
                />

                <label htmlFor="rentTill">Rent till:</label>
                <input
                  type="date"
                  id="rentTill"
                  value={rentTill}
                  onChange={handleRentTillChange}
                  min={rentFrom} // Ensure that rentTill does not exceed rentFrom
                />
              </div>
              <button
                className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5"
                type="button"
                onClick={handleTnx}
              >
                Rent
              </button>
            </>
          )}
        </>
      )}
      {openChat ? (
        <section className={styles.chatHandler}>
          <ChatComponent sellerId={product.seller} />
        </section>
      ) : null}
      <ReviewRating id={id}/>
    </section>
  );
}
