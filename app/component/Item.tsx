import { SelectProducts } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

export default async function Item({ item }: { item: SelectProducts }) {
  const { id, name, description, image, price, type, tag } = item;

  return (
    <div className="flex flex-col items-center justify-center max-w-sm p-6 bg-gray-300 border rounded-xl shadow gap-3 m-4">
      <Link href={`/items/${id}`} className="flex flex-col items-center">
        <Image src={image} alt={name} width={200} height={200} />
        <div className="flex flex-col gap-1 my-4">
          <h3 className="text-lg font-bold text-center">{name}</h3>
          <p className="text-sm">{description}</p>
          <p className="font-bold">${price}</p>
        </div>

        <p
          className="font-bold text-lg text-emerald-600 
        "
        >
          {type.toUpperCase()}
        </p>

        <p className="text-xs self-end bg-emerald-600 p-2 text-white rounded-lg">
          {tag.toUpperCase()}
        </p>
      </Link>
    </div>
  );
}
