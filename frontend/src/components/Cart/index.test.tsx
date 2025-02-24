import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '@/components/Cart';
import { CartContextProvider } from '@/context/cartContext';
import * as useGetContactInfo from '@/hooks/useGetContactInfo';
import * as sendWhatsappMessage from '@/utils/sendWhatsappMessage';

// Mock the lazy-loaded DeliveryInfo component
vi.mock('@/components/Cart/DeliveryInfo', () => ({
  default: () => <div data-testid="delivery-info">Delivery Info</div>
}));

describe('Cart', () => {
  const mockContactInfo = {
    whatsapp: '1234567890',
  };

  beforeEach(() => {
    vi.spyOn(useGetContactInfo, 'useGetContactInfo').mockReturnValue({ contactInfo: mockContactInfo });
    vi.spyOn(sendWhatsappMessage, 'sendWhatsappMessage').mockImplementation(() => {});
    vi.spyOn(sendWhatsappMessage, 'prepareProductsCartToBeSentByWhatsapp').mockReturnValue('Prepared message');
  });

  const renderWithContext = (component) => {
    return render(
      <CartContextProvider>
        {component}
      </CartContextProvider>
    );
  };

  // it('renders cart button with correct count', () => {
  //   renderWithContext(<Cart />);

  //   expect(screen.getByRole('button')).toBeInTheDocument();
  //   expect(screen.queryByText('0')).not.toBeInTheDocument();

  //   // Add a product to the cart
  //   const { addProductToCart } = vi.mocked(CartContextProvider).mock?.calls[0][0]?.value;
  //   addProductToCart({ id: '1', name: 'Product 1', price: 10 });

  //   renderWithContext(<Cart />);
  //   expect(screen.getByText('1')).toBeInTheDocument();
  // });

  it('opens cart dialog when button is clicked', () => {
    renderWithContext(<Cart />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Carrito')).toBeInTheDocument();
  });

  // it('displays empty cart message when cart is empty', () => {
  //   renderWithContext(<Cart />);

  //   fireEvent.click(screen.getByRole('button'));
  //   expect(screen.getByText('Tu carrito está vacio')).toBeInTheDocument();
  // });

  // it('displays cart content when cart has items', () => {
  //   renderWithContext(<Cart />);

  //   const { addProductToCart } = vi.mocked(CartContextProvider).mock.calls[0][0].value;
  //   addProductToCart({ id: '1', name: 'Product 1', price: 10 });

  //   fireEvent.click(screen.getByRole('button'));
  //   expect(screen.getByTestId('delivery-info')).toBeInTheDocument();
  // });

  // it('sends WhatsApp message when delivery info is complete', () => {
  //   renderWithContext(<Cart />);

  //   const { addProductToCart } = vi.mocked(CartContextProvider).mock.calls[0][0].value;
  //   addProductToCart({ id: '1', name: 'Product 1', price: 10 });

  //   fireEvent.click(screen.getByRole('button'));
    
  //   // Simulate setting delivery info
  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify({
  //     name: 'John Doe',
  //     phone: '1234567890',
  //     email: 'john@example.com',
  //     address: '123 Main St',
  //   }));

  //   fireEvent.click(screen.getByText('Enviar pedido'));

  //   expect(sendWhatsappMessage.sendWhatsappMessage).toHaveBeenCalledWith({
  //     phone: '1234567890',
  //     message: 'Prepared message',
  //   });
  // });

  // it('shows error when trying to send order with incomplete delivery info', () => {
  //   renderWithContext(<Cart />);

  //   const { addProductToCart } = vi.mocked(CartContextProvider).mock.calls[0][0].value;
  //   addProductToCart({ id: '1', name: 'Product 1', price: 10 });

  //   fireEvent.click(screen.getByRole('button'));
    
  //   // Simulate incomplete delivery info
  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify({
  //     name: null,
  //     phone: null,
  //     email: null,
  //     address: null,
  //   }));

  //   fireEvent.click(screen.getByText('Enviar pedido'));

  //   expect(sendWhatsappMessage.sendWhatsappMessage).not.toHaveBeenCalled();
  //   expect(screen.getByTestId('delivery-info')).toBeInTheDocument();
  // });
});
