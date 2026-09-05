
import { useContext, useMemo, useState } from "react";
import "./Menu.css";

import Dish from "./Dish/Dish";
import CategoryBar from "./CategoryBar/CategoryBar";
import Search from "./Search/Search";

import { useFetch } from "../../../hooks/useFetch";
import { CartContext } from "../../../Cart/CartProvider";

function Menu() {
  const [category, setCategory] = useState("All");

  const { data = [], loading, error } =
    useFetch(`/dishes.json`);

  const { dispatch } = useContext(CartContext);

  const filteredMenu = useMemo(() => {
    return category === "All"
      ? data
      : data.filter((dish) => dish.category === category);
  }, [data, category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Search />

      <div className="categories">
        <CategoryBar
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <div className="menu">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
              onAdd={() =>
                dispatch({
                  type: "ADD",
                  payload: dish,
                })
              }
            />
          ))
        ) : (
          <p>No dishes found.</p>
        )}
      </div>
    </div>
  );
}

export default Menu;

