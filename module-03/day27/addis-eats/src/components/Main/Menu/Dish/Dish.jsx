import PropTypes from "prop-types";
import "./Dish.css";
import { Flame } from "lucide-react";

function Dish({ name, price, spicy }) {
    return (
        <div className="dish">
            <div className="name">{name}</div>
            <div className="price">{price} ETB</div>

            {spicy && (
                <div className="spicy">🌶️<span>Spicy</span></div>
            )}
        </div>
    );
}

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
};

export default Dish;