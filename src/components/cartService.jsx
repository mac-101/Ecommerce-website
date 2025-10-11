export const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const newItem = {
    id: product.id,
    title: product.title,
    price: product.price,
    totalPrice: product.totalPrice || product.price,
    thumbnail: product.thumbnail,
    quantity: product.quantity || 1,
    createdAt: new Date(),
  };

  const updatedCart = [...existingCart, newItem];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
