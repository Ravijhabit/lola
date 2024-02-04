"use client";

import { useState } from "react";
// import { HiMiniMinusCircle } from "react-icons/hi2";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import ChatComponent from "./ChatComponent";
// components
import ProductDescription from "./ProductDescription";
// styles
import styles from "./page.module.css";

export default function Controller({ id }: { id: string }) {
	const [openChat, setOpenChat] = useState(false);
	const stub = {
		productName: "Sofia",
		productDescription: "rich text format",
		productPrice: "3000",
		productType: "Trade",
		productTag: "sports",
		seller: {
			id: "1",
			name: "Rssssss",
			// all the profile of seller
		},
	};
	const createOrderInServer = (event) => {
		event.preventDefault();

		// Combine API key and secret key in the Authorization header using Basic Authentication
		const authHeader = `Basic ${Buffer.from(
			`${process.env.NEXT_PUBLIC_RAZORPAY_API_KEY} : ${process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET}`,
		).toString("base64")}`;

		const config = {
			method: "GET",
			url: "https://api.razorpay.com/v1/orders",
			maxBodyLength: Infinity,
			headers: {
				"Content-Type": "application/json",
				Authorization: authHeader,
			},
			data: JSON.stringify({
				amount: 500,
				currency: "INR",
				receipt: "qwsaq1",
			}),
		};

		axios
			.request(config)
			.then((response) => {
				console.log(response);
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<section className={styles.controller}>
			{/* Product Description and Buy/Negotiate button */}
			<div className={styles.heading}>Product Description</div>
			<ProductDescription />
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
					className={["btn", "btn-secondary", "btn-sm", styles.box].join(" ")}
					onClick={createOrderInServer}
				>
					Buy
				</button>
			)}
			{openChat ? (
				<section className={styles.chatHandler}>
					<ChatComponent sellerId={stub?.seller} />
				</section>
			) : null}
		</section>
	);
}
