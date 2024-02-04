import { SelectProducts } from "@/db/schema";

// individual items for shorter description
export default function ItemList({ item }: { item: SelectProducts }) {
  const { image, name, description, seller } = item;

  return (
    <>
      {/* image */}
      <img
        className="card-img-top"
        src={image}
        alt={name}
        style={{ width: "400px", height: "400px" }}
      />
      <div className="card-body">
        {/* name */}
        <h3 className="card-title">{name}</h3>
        {/* description */}
        <p className="card-text">{description}</p>
        {/* rental period if any */}
        <small className="card-text">{rentalPeriod}</small>
        {/* seller */}
        <strong className="card-text">{seller}</strong>
        <button type="button" className="btn btn-success">
          Show More
        </button>
      </div>
    </>
  );
}
