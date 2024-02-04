"use client";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";

type ReviewInputs = {
  rating: number;
  review: string;
};

// reviewRating
const ReviewRating = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewInputs>();

  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    axios
      .post("/api/review", {
        ...data,
        product: id,
      })
      .catch((error) => {
        console.log("negative response: ", error);
      });
  };

  return (
    // <section className={styles.reviews}>
    // {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
    <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      {/* Rating of the item */}
      <label>Rating: </label>
      <select {...register("rating", { required: true })}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {/* errors will return when field validation fails  */}
      {errors.rating && <span>This field is required</span>}

      {/* Review of the item */}
      <label>Tell us your feedback:</label>
      <textarea
        rows={5}
        cols={33}
        {...register("review", {
          minLength: { value: 2, message: "Minimum length should be 2" },
          maxLength: { value: 200, message: "Maximum length should be 200" },
          required: {
            value: true,
            message: "This field is required",
          },
        })}
      />
      {errors.review?.message ? <span>{errors.review?.message}</span> : null}
      <input type="submit" />
    </form>
    // </section>
  );
};

export default ReviewRating;
