import { useEffect, useState } from "react";
import { firestore } from "../firebase"; // make sure you export db from firebase.js
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // 🔹 Fetch cart items
  const fetchCartProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "cart"));
      const items = querySnapshot.docs.map((docSnap) => ({
        docId: docSnap.id,   // Firestore document ID (unique)
        ...docSnap.data(),   // product fields (title, price, thumbnail, etc.)
      }));
      setCartItems(items);
      console.log("Cart items:", items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // 🔹 Delete a cart item
  const deleteCartProduct = async (docId) => {
    try {
      await deleteDoc(doc(firestore, "cart", docId));
      console.log("Deleted cart item with id:", docId);
      // Refresh cart after delete
      setCartItems((prev) => prev.filter((item) => item.docId !== docId));
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  // 🔹 Fetch on mount
  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item) => (
            <li key={item.docId} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => deleteCartProduct(item.docId)}
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