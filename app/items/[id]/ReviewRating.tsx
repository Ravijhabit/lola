"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ratingErrorMessage } from "@/app/constant";

type ReviewInputs = {
  rating: number;
  review: string;
};

// reviewRating
export default function ReviewRating({id}) {
  
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ReviewInputs>();
  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    axios
      .post("/api/review", {
        ...data,
        id: id
      })
      .then(function (response) {
        console.log("positive response: ", response);
      })
      .catch(function (error) {
        console.log("negative response: ", error);
      });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
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
          minLength: 1,
          maxLength: 200,
        })}
      />
      {errors.review && (
        <span>{ratingErrorMessage[errors.review.type]}</span>
      )}
      <input type="submit" />
    </form>
  );
}
