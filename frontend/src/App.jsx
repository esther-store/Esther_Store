import "primereact/resources/themes/lara-light-cyan/theme.css";
import NavBar from "./components/NavBar/index.jsx";
import "primeicons/primeicons.css";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import Providers from "@/AppProviders.jsx";
import "@/fonts.css";

function App() {
  return (
    <Providers>
      <header>
        <NavBar />
      </header>
      <section className="main-section-route">
        <AppRoutes />
      </section>
    </Providers>
  );
}

export default App;
