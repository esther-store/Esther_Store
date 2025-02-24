import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { CartContextProvider } from '@/context/cartContext';
import React, { useContext } from 'react';
import CartContext from '@/context/cartContext';

describe('CartContextProvider', () => {
  let TestComponent;
  let result;

  beforeEach(() => {
    TestComponent = () => {
      const context = useContext(CartContext);
      result = context;
      return null;
    };
  });

  it('provides initial empty cart', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>
    );

    expect(result.productsCart).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('adds a new product to cart', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>
    );

    act(() => {
      result.addProductToCart({ id: '1', name: 'Test Product', price: 10 });
    });

    expect(result.productsCart).toHaveLength(1);
    expect(result.productsCart[0]).toEqual({
      id: '1',
      name: 'Test Product',
      price: 10,
      quantity: 1,
      subtotal: 10
    });
    expect(result.total).toBe(10);
  });

  // it('increases quantity of existing product in cart', () => {
  //   render(
  //     <CartContextProvider>
  //       <TestComponent />
  //     </CartContextProvider>
  //   );

  //   act(() => {
  //     result.addProductToCart({ id: 1, name: 'Test Product 1', price: 10 });
  //   });
  //   act(() => {
  //     result.addProductToCart({ id: 1, name: 'Test Product 2', price: 10 });
  //   });

  //   expect(result.productsCart).toHaveLength(1);
  //   expect(result.productsCart[0].quantity).toBe(2);
  //   expect(result.productsCart[0].subtotal).toBe(20);
  //   expect(result.total).toBe(20);
  // });

  // it('rest product cart quantity', () => {
  //   render(
  //     <CartContextProvider>
  //       <TestComponent />
  //     </CartContextProvider>
  //   );

  //   act(() => {
  //     result.addProductToCart({ id: 1, name: 'Test Product 1', price: 10, quantity:2 });
  //   });
  //   act(() => {
  //     result.addProductToCart({ id: 2, name: 'Test Product 2', price: 10 });
  //   });
  //   act(() => {
  //     result.restProductFromCart(1);
  //   });
  //   console.log(result.productsCart)

  //   expect(result.productsCart.find((product) => product.id === 1).quantity).toBe(1);
  // });

//   it('deletes a product from cart', () => {
//     render(
//       <CartContextProvider>
//         <TestComponent />
//       </CartContextProvider>
//     );

//     act(() => {
//       result.addProductToCart({ id: '1', name: 'Test Product', price: 10 });
//       result.deleteProductFromCart('1');
//     });

//     expect(result.productsCart).toHaveLength(0);
//     expect(result.total).toBe(0);
//   });

//   it('cleans the cart', () => {
//     render(
//       <CartContextProvider>
//         <TestComponent />
//       </CartContextProvider>
//     );

//     act(() => {
//       result.addProductToCart({ id: '1', name: 'Test Product', price: 10 });
//       result.addProductToCart({ id: '2', name: 'Another Product', price: 20 });
//       result.cleanCart();
//     });

//     expect(result.productsCart).toHaveLength(0);
//     expect(result.total).toBe(0);
//   });

//   it('checks if a product is in the cart', () => {
//     render(
//       <CartContextProvider>
//         <TestComponent />
//       </CartContextProvider>
//     );

//     act(() => {
//       result.addProductToCart({ id: '1', name: 'Test Product', price: 10 });
//     });

//     expect(result.checkProductInCart('1')).toBe(true);
//     expect(result.checkProductInCart('2')).toBe(false);
//   });
});
