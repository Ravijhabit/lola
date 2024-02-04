"use client";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";

type ReviewInputs = {
  myProduct: string
};

// reviewRating
const Trade = ({ userProduct, tradeProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ReviewInputs>();

  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    axios
      .post("/api/transaction", {
        ...data,
        product: tradeProduct
      })
      .catch((error) => {
        console.log("negative response: ", error);
      });
    reset()
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      {/* Rating of the item */}
      <label>Selected from your products: </label>
      <select {...register("myProduct", { required: true })}>
        {userProduct.map((product)=>
            <option value={product}>{product}</option>
        )}
      </select>
      {/* errors will return when field validation fails  */}
      {errors.rating && <span>This field is required</span>}
    
      <input type="submit" />
    </form>
  );
};

export default Trade;
