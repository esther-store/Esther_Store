import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import Providers from "@/AppProviders.jsx";
import "@/fonts.css";

function App() {
  return (
    <Providers>
        <AppRoutes />
    </Providers>
  );
}

export default App;
