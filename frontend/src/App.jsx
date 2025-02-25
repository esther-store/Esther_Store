import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import Providers from "@/AppProviders.jsx";
import "@/fonts.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import Footer from "@/components/Footer/index.jsx";

function App() {
  return (
    <Providers>
      <section style={{ minHeight: "91vh" }}>
        <AppRoutes />
        <ScrollToTopOnNavigate />
        <ReactQueryDevtools initialIsOpen={false} />
      </section>
      <Footer />
    </Providers>
  );
}

export default App;
