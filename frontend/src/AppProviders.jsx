import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {CartContextProvider} from './context/cartContext.tsx'
import {QueryFiltersContextProvider} from './context/filtersContext'
import {AuthenticationContextProvider} from './context/authenticationContext.jsx'
import { PrimeReactProvider } from 'primereact/api';
import {BrowserRouter as Router} from 'react-router-dom'

function Providers({ children }) {
  const client = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={client}>
        <PrimeReactProvider>
          <AuthenticationContextProvider>
            <CartContextProvider>
              <QueryFiltersContextProvider>
                {children}
              </QueryFiltersContextProvider>
            </CartContextProvider>
          </AuthenticationContextProvider>
        </PrimeReactProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default Providers;
