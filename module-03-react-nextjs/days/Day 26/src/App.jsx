

     import Header from "./Header";
import Dish from "./Dish";

const menu = [
  { id: 1, name: "Doro Wat", price: 600 },
  { id: 2, name: "Shiro", price: 200 },
  { id: 3, name: "Tibs", price: 1000 }
];

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="menu-list">
        {menu.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;