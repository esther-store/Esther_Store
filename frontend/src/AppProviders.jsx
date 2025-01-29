import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {CartContextProvider} from './context/cartContext.jsx'
import {QueryFiltersContextProvider} from './context/filtersContext.jsx'
import {AuthenticationContextProvider} from './context/authenticationContext.jsx'
import { PrimeReactProvider } from 'primereact/api';
import {HashRouter as Router} from 'react-router-dom'

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
