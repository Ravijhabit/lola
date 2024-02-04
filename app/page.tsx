import db from "@/db";
import Item from "./component/Item";

export default async function Home() {
  const items = await db.query.products.findMany({});

  return (
    <>
      <main className="flex justify-center items-center gap-3 flex-wrap">
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </main>
    </>
  );
}
