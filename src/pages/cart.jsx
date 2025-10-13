import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartProducts = () => {
    const stored = localStorage.getItem("cart");
    const cartItems = stored ? JSON.parse(stored) : [];
    setCartItems(cartItems);
  };

  const deleteCartProduct = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQty) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getCartTotal = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>
        <div>
          <Link to="/checkout">
            <p className="text-xl font-bold mt-6">
              Total ${getCartTotal(cartItems).toFixed(2)}{" "}
              <button className="py-3 px-5 rounded-3xl bg-gray-300">Check out</button>
            </p>
          </Link>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    ${Number(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity Input */}
                  <div className="flex items-center gap-2 mt-1">
                    <label className="text-sm text-gray-500">Qty:</label>

                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 bg-gray-200 rounded text-sm font-bold"
                    >
                      –
                    </button>

                    <span className="px-3 py-1 border rounded text-sm">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteCartProduct(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}