import db from "@/db";
import { products } from "@/db/schema";
import ItemList from "./component/ItemList";

export default async function Home() {
  const items = await db.select().from(products);

  return (
    <>
      <main className="card-group">
        {items.map((item) => (
          <ItemList item={item} />
        ))}
      </main>
    </>
  );
}
