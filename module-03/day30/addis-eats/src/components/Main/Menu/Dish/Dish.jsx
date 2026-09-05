import PropTypes from "prop-types";
import "./Dish.css";

import { useState } from "react";

function Dish({ name, price, spicy, calcTotal }) {
    const [counter, setCounter] = useState(0)

    function handleClick() {
        setCounter(counter + 1)
    }
    return (
        <div className="dish">
            <div className="name">{name}</div>
            <div className="price">{price} ETB</div>

            {spicy && (
                <div className="spicy">🌶️<span>Spicy</span></div>
            )}
            {<div><button onClick={() => {
                handleClick()
                calcTotal(price)
            }
            }>Add {counter}</button></div>}
        </div>
    );
}

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
};

export default Dish;