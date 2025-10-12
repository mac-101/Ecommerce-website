import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./button";
import { addToCart } from "./cartService";
import { Link } from "react-router-dom";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // default quantity

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="justify-self-center w-full mx-auto p-6 flex gap-6 flex-col md:flex-row bg-white rounded-xl shadow">
            <div className="w-full flex justify-center">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full max-w-xl bg-gray-200 max-h-xl h-full object-contain rounded-lg mb-4"
                />
            </div>
            <div className="w-full">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">{product.title}</h1>
                <p className="text-gray-600 my-6">{product.description}</p>
                <p className="text-sm text-gray-500 mb-4">⭐ {product.rating}</p>

                <div className="border-t-2 border-b-2 border-gray-200 py-5">
                    <p className="text-4xl font-semibold mb-2">${product.price}</p>
                    <p>Suggested payment with 6 month special financing</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mt-4">
                    <label htmlFor="quantity" className="text-sm text-green-900">
                        Quantity:
                    </label>
                    <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                        className="w-20 px-2 py-1 border rounded text-sm"
                    />
                </div>

                <div className="flex my-10 gap-5">
                    {/* Total Price */}
                    <p className="mt-2 text-green-900 font-medium">
                        Total: ${product.price * quantity.toFixed(2)}
                    </p>

                    {/* Add to Cart Button */}

                    <Button
                        label="Add to Cart"
                        onClick={() => {
                            const totalPrice = product.price * quantity;
                            addToCart({ ...product, quantity, totalPrice });
                            console.log("Add:", product, "Qty:", quantity, "Total:", totalPrice);
                        }}
                    />
                    <Link to="/cart">
                        <button className="btn rounded-[40px] py-2 px-5 w-fit text-sm font-bold text-white border bg-green-900 hover:text-white">
                            View Cart
                        </button>
                    </Link>

                </div>
                <div>
                    <div className="p-5 border-2 border-gray-200">
                        <h1 className="font-semibold">Free Delivery</h1>
                        <p className="underline text-sm">Enter your Postal code for Delivery Availability</p>
                    </div>
                    <div className="p-5 border-2 border-gray-200">
                        <h1 className="font-semibold">Return Delivery</h1>
                        <p className="text-sm">Free 30days Delivery Returns. <span className="underline">Details</span></p>
                    </div>
                </div>
            </div>

        </div>
    );
}