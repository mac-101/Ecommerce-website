// src/services/cartService.js
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const addToCart = async (product) => {
  try {
    await addDoc(collection(firestore, "cart"), {
      id: product.id,
      title: product.title,
      price: product.price,                     // unit price
      totalPrice: product.totalPrice || product.price, // total = price × quantity
      thumbnail: product.thumbnail,
      quantity: product.quantity || 1,
      createdAt: new Date(),
    });
    console.log(`Added ${product.quantity || 1} of ${product.title} to cart`);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};