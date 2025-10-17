export const addToCart = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = existingCart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
    const updatedCart = existingCart.map((item) =>
      item.id === product.id ? existingItem : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      totalPrice: product.totalPrice || product.price,
      thumbnail: product.thumbnail,
      quantity: product.quantity || 1,
      description: product.description,
      createdAt: new Date(),
    };
    const updatedCart = [...existingCart, newItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // 🔔 Notify listeners
  window.dispatchEvent(new Event("cartUpdated"));
};