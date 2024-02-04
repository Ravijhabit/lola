import styles from './page.module.css'
import { FaUser } from "react-icons/fa";
export default function Reviews({ reviews }) {
	return (
		<>
			{reviews.map(({review}:{review:{image:string,message:string}}) => (
				<section className={styles.review}>
					{/* img tag */}
                    {(Object.keys(review).includes('image') && review.image!=='') ? 
					    <img src={review.image} alt={review.message} />
                    :<FaUser />}
					{/* comment */}
					<p>{review.message}</p>
				</section>
			))}
		</>
	);
}
