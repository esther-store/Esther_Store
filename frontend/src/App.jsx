import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import Providers from "@/AppProviders.jsx";
import "@/fonts.css";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";

function App() {
  return (
    <Providers>
        <AppRoutes />
        <ScrollToTopOnNavigate/>
        <ReactQueryDevtools initialIsOpen={false}/>
    </Providers>
  );
}

export default App;
