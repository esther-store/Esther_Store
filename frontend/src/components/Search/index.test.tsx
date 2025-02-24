import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from './index';
import {QueryFiltersContextProvider} from '@/context/filtersContext';

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Search Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <Search />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText('Buscar')).toBeInTheDocument();
  });

  it('updates search value on input change', async () => {
    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <Search />
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Buscar');
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(input).toHaveValue('test search');
  });

  it('navigates to store page with search query when on home page or product detail page', async () => {
    render(
      <BrowserRouter>
        <QueryFiltersContextProvider>
          <Search redirectToStoreOnSearch = {true}/>
        </QueryFiltersContextProvider>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText('Buscar');
    fireEvent.change(input, { target: { value: 'test search' } });
    
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/store?search=test+search');
  });

});
