"use client";

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

enum enumType {
  rent = "rent",
  trade = "trade",
}

enum enumTag {
  sports = "sports",
  clothing = "clothing",
  furniture = "furniture",
  books = "books",
  electronics = "electronics",
}

type ProductInputs = {
  name: string;
  description: string;
  price: number;
  tag: enumTag;
  type: enumType;
};

export default function App() {
  const [image, setImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInputs>();

  const onSubmit: SubmitHandler<ProductInputs> = (data) => {
    if (image === "") {
      setImageError(true);
      return;
    }

    axios
      .post("/api/createProduct", {
        ...data,
        image,
      })
      .catch((error) => {
        console.log("negative response: ", error);
      });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name of the item */}
      <label>Name: </label>
      <input type="text" {...register("name", { required: true })} />

      {errors.name && <span>This field is required</span>}

      {/* Image Url of the item */}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: unknown) => {
          setImageFile(res[0]?.name);
          setImage(res[0]?.url);
          setImageError(false);
        }}
        onUploadError={(error: Error) => {
          setImageError(true);
          console.error("Error uploading image", error);
        }}
      />
      {image && <img src={image} alt="item" style={{ height: "100px" }} />}
      {imageFile && <p>{imageFile}</p>}
      {imageError && <span>Image is required</span>}

      {/* description of the item */}
      <label>Description: </label>
      <input {...register("description", { required: true })} />

      {errors.description && <span>This field is required</span>}

      {/* price of the item*/}
      <label>Price: </label>
      <input type="number" {...register("price", { required: true, min: 0 })} />

      {errors.price && <span>This field is required</span>}

      {/* tag of the item*/}
      <label>Tag: </label>
      <select {...register("tag", { required: true })}>
        <option value="games">Games</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="furniture">Furniture</option>
        <option value="electronics">Electronics</option>
      </select>

      {errors.tag && <span>This field is required</span>}

      {/* type of the item*/}
      <label>Type: </label>
      <select {...register("type", { required: true })}>
        <option value="rent">Rent</option>
        <option value="trade">Trade</option>
      </select>

      {errors.type && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
