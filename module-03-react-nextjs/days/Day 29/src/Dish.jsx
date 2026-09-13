import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, onAddToCart }) {
  return (
    <div className="dish">
      <h3>
        {name} {spicy && <span className="spicy-badge">• Spicy</span>}
      </h3>
      <p>{price} {currency}</p>
      <button onClick={() => onAddToCart(price)}>Add to Order</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  onAddToCart: PropTypes.func.isRequired
};

export default Dish;