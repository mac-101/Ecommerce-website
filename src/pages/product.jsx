import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../components/cartService";

export default function Products({ group = "first", limit = 4 }) {
    const url = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    // Slice products based on group
    let displayedProducts = [];
    if (group === "first") {
        displayedProducts = products.slice(0, limit);
    } else if (group === "second") {
        displayedProducts = products.slice(limit, limit * 2);
    }

    // ✅ Now it's safe to access displayedProducts[0]
    const heroProduct = displayedProducts[6];

    useEffect(() => {
        const fetchingGoods = async () => {
            try {
                const res = await axios.get(url);
                setProducts(res.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchingGoods();
        
    }, []);

    // Render differently depending on group
    if (group === "first") {
        // Grid card style
        return (

            <div>

                {heroProduct && (
                    <section className="w-full flex justify-center items-center p-1 md:p-5">

                        <div className=" w-full flex gap-5 flex-col md:flex-row bg-red-400 p-5 md:px-15 lg:px-30 items-center rounded-xl shadow-lg">
                            <div className="font-bold md:w-[50%] mt-2 text-lg">
                                <h3 className="text-4xl mb-2 md:text-5xl">Grab Upto 50% Off On our Blacklist Season</h3>

                                <Button
                                    label="Shop Now"
                                    className="w-fit"
                                    onClick={() => navigate("/cart")}
                                />
                            </div>
                            <div className="md:w-[50%] ">
                                <img
                                    src={heroProduct.thumbnail}
                                    alt={heroProduct.title}
                                    className="w-full h-60 object-contain rounded-2xl"
                                />
                            </div>

                        </div>

                    </section>
                )}


                <div
                    className="grid justify-items-center-center gap-1 p-2"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
                >
                    {displayedProducts.map((item) => (
                        <Link key={item.id} to={`/product/${item.id}`}>
                            <div
                                key={item.id}
                                className="card w-full max-w-[300px] gap-1 flex justify-self-center p-1 flex-col bg-white rounded-xl"
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="bg-gray-200 w-full h-40 object-contain rounded-2xl"
                                />
                                <div className="flex justify-between font-bold mt-2">
                                    <h3 className="truncate">{item.title}</h3>
                                    <p>${item.price}</p>
                                </div>
                                <p className="text-xs text-gray-500">Rating: {item.rating}</p>
                                <p className="text-sm text-gray-600">
                                    {item.description.slice(0, 30)}...
                                </p>
                                <Button
                                    label="Add to Cart"
                                    onClick={(e) => {
                                        e.preventDefault();   // stops the Link navigation
                                        e.stopPropagation();  // stops the click bubbling up to the Link
                                        addToCart(item);      // your cart logic
                                    }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        );
    }

    if (group === "second") {
        // Horizontal list style
        return (
            <div className="flex overflow-hidden flex-col items-center gap-3 p-2">

                <h1 className="font-bold text-4xl md-text-5xl my-5">Exclusive Offers</h1>

                {displayedProducts.map((item) => (
                    <div
                        key={item.id}
                        className="flex max-w-[600px] w-full bg-white rounded-xl shadow p-3 gap-4"
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="bg-gray-200 w-28 h-28 object-contain rounded-lg"
                        />
                        <div className="flex flex-col flex-1">
                            <div className="flex flex-wrap justify-between font-bold w-full">
                                <h3 className="w-full sm:w-auto truncate">{item.title}</h3>
                                <p className="text-right sm:text-left">${item.price}</p>
                            </div>
                            <p className="text-xs text-gray-500">Rating: {item.rating}</p>
                            <p className="text-sm text-gray-600">
                                {item.description.slice(0, 40)}...
                            </p>
                            <div className="mt-auto">
                                <Button
                                    label="Add to Cart"
                                    onClick={(e) => {
                                        e.preventDefault();   // stops the Link navigation
                                        e.stopPropagation();  // stops the click bubbling up to the Link
                                        addToCart(item);      // your cart logic
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}