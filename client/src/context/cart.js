// import { useState, useContext, createContext, useEffect } from "react";

// const CartContext = createContext();
// const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         let existingCartItem = localStorage.getItem("cart");
//         if (existingCartItem) setCart(JSON.parse(existingCartItem));
//     }, []);

//     return (
//         <CartContext.Provider value={[cart, setCart]}>
//             {children}
//         </CartContext.Provider>
//     );
// };


// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };
// ======================================
// import { useState, useContext, createContext, useEffect } from "react";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     let existingCartItem = localStorage.getItem("cart");
//     if (existingCartItem) {
//       setCart(JSON.parse(existingCartItem));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <CartContext.Provider value={[cart, setCart]}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };


// ================================================
import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth"; // Import the useAuth hook from your auth context

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [auth] = useAuth(); // Retrieve the authentication token from the auth context

  useEffect(() => {
    let existingCartItem = localStorage.getItem(`cart_${auth?.token}`);
    if (existingCartItem) {
      setCart(JSON.parse(existingCartItem));
    }
  }, [auth]);

  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem(`cart_${auth.token}`, JSON.stringify(cart));
    }
  }, [cart, auth]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
// ===========================================================================
