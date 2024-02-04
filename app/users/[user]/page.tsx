import styles from "./profile.module.css";
export interface ProfileProps {
	params: { id: string };
}
export default function Profile(props: ProfileProps) {
	// name
	// email
	// all the products
	// products bought
	// products sold
	const stub = {
		name: "SUru",
        image:' ',
		email: "hi@anandSUr.com"
	};
	return (
		<section className={styles.container}>
            {/* Profile Image */}
            <img className={styles.profileImg} src={stub.image} alt="dummyImage"/>
			<div className={styles.title}>
				<div className={styles.value}>{stub.name}</div>
			</div>
			<div className={styles.title}>
				<div className={styles.value}>{stub.email}</div>
			</div>
			{/* <div className={styles.transactions}>
                <h4>Transaction History</h4>
				<div className={styles.value}>
					{stub.products.map((item) => 
						<h1>{item}</h1>
					)}
				</div>
			</div> */}
		</section>
	);
}
