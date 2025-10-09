import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./button";
import { addToCart } from "./cartService";

export default function ProductDetail() {
    const { id } = useParams(); // get product id from URL
    const [product, setProduct] = useState(null);

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
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-64 object-contain rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold text-green-700 mb-2">
                ${product.price}
            </p>
            <p className="text-sm text-gray-500 mb-4">⭐ {product.rating}</p>
            <Button
                label="Add to Cart"
                onClick={() => {
                    addToCart(product);             // saves to Firestore
                    console.log("Add:", product);   // logs product details
                }}
            />
        </div>
    );
}