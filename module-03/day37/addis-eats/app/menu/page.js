import { getDishes } from "./dishes";
import MenuCard from "./menu-card/MenuCard";


export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((d) => (
        <MenuCard key={d.id} data={d} />
      ))}
    </div>
  );
}