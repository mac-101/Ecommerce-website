// src/services/cartService.js
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const addToCart = async (product) => {
  try {
    await addDoc(collection(firestore, "cart"), {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
      createdAt: new Date(),
    });
    console.log("Added to cart:", product.title);
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};