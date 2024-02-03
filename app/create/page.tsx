"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios'

// type enum
enum enumType {
  rent = "rent",
  trade = "trade",
}

// tag enum
enum enumTag {
  sports = "sports",
  clothing = "clothing",
  furniture = "furniture",
  books = "books",
  electronics = "electronics",
}

type ProductInputs = {
  name: string;
  image: string;
  description: string;
  // sellerId: string
  price: number;
  tag: enumTag;
  type: enumType;
  rentedTill: Date;
};

export default function App() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<ProductInputs>();
  const onSubmit: SubmitHandler<ProductInputs> = (data) => {
    axios.post('/api/createProduct', {
      ...data
    })
    .then(function (response) {
      console.log('positive response: ',response);
    })
    .catch(function (error) {
      console.log('negative response: ',error);
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* Name of the item */}
      <label>Title: </label>
      <input type="text" {...register("name", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.name && <span>This field is required</span>}

      {/* Image Url of the item */}
      <label>Image: </label>
      <input type="file" {...register("image")} />
      {/* errors will return when field validation fails  */}
      {errors.image && <span>This field is required</span>}

      {/* description of the item */}
      <label>Description: </label>
      <input {...register("description", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.description && <span>This field is required</span>}

      {/* price of the item*/}
      <label>Price: </label>
      <input type="number" {...register("price", { required: true, min: 0 })} />
      {/* errors will return when field validation fails  */}
      {errors.price && <span>This field is required</span>}

      {/* tag of the item*/}
      <label>Tag: </label>
      <select {...register("tag", { required: true })}>
        <option value="sports">Sports</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="furniture">Furniture</option>
        <option value="electronics">Electronics</option>
      </select>
      {/* errors will return when field validation fails  */}
      {errors.tag && <span>This field is required</span>}

      {/* type of the item*/}
      <label>Type: </label>
      <select {...register("type", { required: true })}>
        <option value="rent">Rent</option>
        <option value="trade">Trade</option>
      </select>

      {/* errors will return when field validation fails  */}
      {errors.type && <span>This field is required</span>}

      {/* rented till */}
      <label>Rented: </label>
      <input type="date" {...register("rentedTill")} />

      <input type="submit" />
    </form>
  );
}
