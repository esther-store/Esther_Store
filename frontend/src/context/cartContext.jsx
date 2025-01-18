import React, { useState, useCallback, useMemo } from "react";

const CartContext = React.createContext([]);

export function CartContextProvider({ children }) {
  const [productsCart, setProductCart] = useState([]);

  const addProductToCart = useCallback(function addProductToCart(newProduct) {
    let productsCartCopy = [...productsCart];
    let product = productsCartCopy.find(
      (product) => product.id == newProduct.id
    );
    //if the product is already in the cart, increase the quantity in 1
    if (product !== undefined) {
      product.quantity += 1;
      product.subtotal = product.quantity * product.price;
      setProductCart(productsCartCopy);
    } else {
      //if the product is not in the cart, add it
      newProduct['subtotal'] = newProduct.price
      newProduct['quantity'] = 1
      productsCartCopy.push(newProduct);
      setProductCart(productsCartCopy);
    }
  },[productsCart])

  const restProductFromCart = useCallback(function restProductFromCart(newProduct) {
    let productsCartCopy = [...productsCart];
    if (newProduct !== undefined && newProduct !== null) {
      for (let i = 0; i < productsCartCopy.length; i++) {
        if (newProduct.id === productsCartCopy[i].id) {
          productsCartCopy[i].quantity -= 1;
          productsCartCopy[i].subtotal =
            productsCartCopy[i].quantity * productsCartCopy[i].price;
          if (productsCartCopy[i].quantity <= 0) {
            productsCartCopy.splice(i, 1);
          }
          break;
        }
      }
      setProductCart(productsCartCopy);
    }
  },[productsCart])

  const deleteProductFromCart = useCallback(function deleteProductFromCart(id) {
    let productsCartCopy = [...productsCart];
    for (let i = 0; i < productsCartCopy.length; i++) {
      if (productsCartCopy[i].id === id) {
        productsCartCopy.splice(i, 1);
        break;
      }
    }
    setProductCart(productsCartCopy);
  },[productsCart])

  function cleanCart() {
    setProductCart([]);
  }

  const total = useMemo(function calculateTotal() {
    return productsCart.reduce((acc, product) => acc += product.subtotal, 0)
  }, [productsCart])

  const checkProductInCart = useCallback(function checkProductInCart(id) {
    let product = productsCart.find(
        (product) => product.id == id
      );
    return product === undefined ? false : true  
  },[productsCart])

  return (
    <CartContext.Provider
      value={{
        productsCart,
        addProductToCart,
        restProductFromCart,
        deleteProductFromCart,
        cleanCart,
        total,
        checkProductInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
