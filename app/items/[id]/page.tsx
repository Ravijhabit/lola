
import styles from "./page.module.css";
import Controller from "./Controller";
export interface IAppProps {
  params: { id: string };
}

// individual item for rental - Longer description
export default function page(props: IAppProps) {
  return (
    <section className={styles.flex}>
      {/* Hero Image */}
      <img
        className={styles.heroImage}
        src="https://imageio.forbes.com/specials-images/imageserve/5d95d03767dd830006a295b6/GETTY/960x0.jpg?format=jpg&width=960"
        alt="heroImage"
      />
      {/* Controller showing detais -> reason of passing is we want server component here. To make an api call and showcase the product that is selected. */}
      <Controller id={props.params.id}/>
      {/* <h1>{`Name is ${props.params.id}`}</h1>
      {ItemLists.filter((item)=>item.id ===props.params.id).map((filteredItem)=><h1>{filteredItem.name}</h1>)} */}
      {/* <ReviewRating id={props.params.id} /> */}
    </section>
  );
}
