import PropTypes from "prop-types";

function CategoryBar({ selected, onSelect }) {
  const categories = ["All", "Main", "Vegan", "Grill"];

  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "chip active" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CategoryBar;