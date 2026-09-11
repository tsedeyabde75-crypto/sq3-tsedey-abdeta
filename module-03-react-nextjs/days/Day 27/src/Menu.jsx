import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

function Menu({ dishes, category }) {
  const shown = dishes.filter((dish) => dish.category === category);

  if (shown.length === 0) {
    return <p>No {category} dishes available.</p>;
  }

  return (
    <div className="menu">
      {shown.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool
    })
  ).isRequired,
  category: PropTypes.string.isRequired
};

export default Menu;