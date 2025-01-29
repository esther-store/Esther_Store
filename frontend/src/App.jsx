import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import NavBar from "./components/NavBar/index.jsx";
import Footer from "./components/Footer/index.jsx";
import "primeicons/primeicons.css";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import Providers from "@/AppProviders.jsx";

function App() {
  return (
    <Providers>
      <section>
        <header>
          <NavBar />
        </header>
        <section className="main-section-route">
          <AppRoutes/>
        </section>
        <footer>
          <Footer />
        </footer>
      </section>
    </Providers>
  );
}

export default App;
