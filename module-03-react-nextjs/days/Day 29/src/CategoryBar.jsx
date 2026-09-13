export default function CategoryBar({ selected, onSelect }) {
  const cats = ["All", "Main", "Vegan", "Grill"];

  return (
    <div className="category-bar">
      {cats.map((cat) => (
        <button
          key={cat}
          className={cat === selected ? "chip on" : "chip"}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}