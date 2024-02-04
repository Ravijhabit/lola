"use client"
import { useState } from "react";
import styles from "./page.module.css";
import Controller from "./Controller";
import Reviews from "./Reviews";
import ReviewRating from "./ReviewRating";
export interface IAppProps {
	params: { id: string };
}

// individual item for rental - Longer description
export default function Item(props: IAppProps) {
	const [showRating, setShowRating] = useState(false);
	return (
		<section className={styles.item}>
			<section className={styles.productDetails}>
				{/* Hero Image */}
				<img
					className={styles.heroImage}
					src="https://imageio.forbes.com/specials-images/imageserve/5d95d03767dd830006a295b6/GETTY/960x0.jpg?format=jpg&width=960"
					alt="heroImage"
				/>
				{/* Controller showing detais -> reason of passing is we want server component here. To make an api call and showcase the product that is selected. */}
				{/* Product  */}
				<Controller id={props.params.id} />
			</section>
			{/* Review Section */}
			<section className={styles.review}>
				<div className={styles.heading}>Review</div>
        {/* send reviews as a parameter */}
				<Reviews reviews={[]}/>
				{showRating ? (
					<ReviewRating id={props.params.id} setShowRating={setShowRating}/>
				) : (
					<button type="button" className="btn btn-primary" onClick={() => setShowRating(true)}>Add Review</button>
				)}
			</section>
		</section>
	);
}
