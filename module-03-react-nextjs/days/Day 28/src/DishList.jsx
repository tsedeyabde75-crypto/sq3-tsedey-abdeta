import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

function DishList({ dishes, category, onAddToCart }) {
  const shown =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (shown.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-list">
      {shown.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            onAddToCart={onAddToCart}
          />
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default DishList;