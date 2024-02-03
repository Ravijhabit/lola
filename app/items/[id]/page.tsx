"use client";
import { useState } from "react";
import { HiMiniMinusCircle } from "react-icons/hi2";
import ReviewRating from "./ReviewRating";
import styles from "./page.module.css";
export interface IAppProps {
  params: { id: string };
}

// individual item for rental - Longer description
export default function page(props: IAppProps) {
  const [modalOpen, setModalOpen] = useState(0);
  return (
    <section className={styles.flex}>
      {/* <h1 className={styles.heroImage}>Bg Image</h1> */}
      <img
        className={styles.heroImage}
        src="https://imageio.forbes.com/specials-images/imageserve/5d95d03767dd830006a295b6/GETTY/960x0.jpg?format=jpg&width=960"
        alt="heroImage"
      />
      {/* can shift this modal for client component */}
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
            console.log("open1 ");
            setModalOpen(1);
          }}
        >
          Product Description
        </div>
        <div
          className={modalOpen === 2 ? styles.selected : ""}
          style={{ background: "green", cursor: "pointer" }}
          onClick={() => setModalOpen(2)}
        >
          Review
        </div>
        <div
          className={modalOpen === 3 ? styles.selected : ""}
          style={{ background: "blue", cursor: "pointer" }}
          onClick={() => setModalOpen(3)}
        >
          Go Forward
        </div>
      </section>
      {/* <h1>{`Name is ${props.params.id}`}</h1>
      {ItemLists.filter((item)=>item.id ===props.params.id).map((filteredItem)=><h1>{filteredItem.name}</h1>)} */}
      <ReviewRating id={props.params.id} />
    </section>
  );
}
