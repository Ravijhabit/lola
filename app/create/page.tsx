"use client";

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./form.module.css";

enum enumType {
	rent = "rent",
	trade = "trade",
}

enum enumTag {
	games = "games",
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
		<section className={styles.form}>
			<h1
				style={{
					"text-align": "center",
					margin: "20px 0",
					fontSize: "34px",
					fontWeight: "bold",
				}}
			>
				Make an Entry
			</h1>
			{/*  "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
			<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
				{/* Name of the item */}

				<label>
					Name:
					<input type="text" {...register("name", { required: true })} />
				</label>
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
				<label>
					Description:
					<input {...register("description", { required: true })} />
				</label>

				{errors.description && <span>This field is required</span>}

				{/* price of the item*/}
				<label>
					Price:
					<input
						type="number"
						{...register("price", { required: true, min: 0 })}
					/>
				</label>

				{errors.price && <span>This field is required</span>}

				{/* tag of the item*/}
				<label>
					Tag:
					<select {...register("tag", { required: true })}>
						<option value="games">Games</option>
						<option value="clothing">Clothing</option>
						<option value="books">Books</option>
						<option value="furniture">Furniture</option>
						<option value="electronics">Electronics</option>
					</select>
				</label>

				{errors.tag && <span>This field is required</span>}

				{/* type of the item*/}
				<label>
					Type:
					<select {...register("type", { required: true })}>
						<option value="rent">Rent</option>
						<option value="trade">Trade</option>
					</select>
				</label>

				{errors.type && <span>This field is required</span>}
				<button
					type="submit"
					className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5 my-2"
        >
					Submit
				</button>
			</form>
		</section>
	);
}
