import Header from "./Header";
import Menu from "./Menu";
import { menuData } from "./data";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <h2>Mains</h2>
        <Menu dishes={menuData} category="Mains" />
      </main>
    </div>
  );
}

export default App;