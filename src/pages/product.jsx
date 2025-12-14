import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../components/cartService";
import { Star, ChevronRight, ShoppingBag, Tag, Clock, TrendingUp } from "lucide-react";

export default function Products({ group = "first", limit = 4 }) {
    const url = "https://dummyjson.com/products";
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Slice products based on group
    let displayedProducts = [];
    if (group === "first") {
        displayedProducts = products.slice(0, limit);
    } else if (group === "second") {
        displayedProducts = products.slice(limit, limit * 2);
    }

    const heroProduct = displayedProducts[0];

    // Categories for filter tabs
    const categories = [
        "All Products",
        "Electronics",
        "Smartphones",
        "Laptops",
        "Fragrances",
        "Skincare",
        "Home Decor",
        "Groceries"
    ];

    useEffect(() => {
        const fetchingGoods = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(url);
                setProducts(res.data.products);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchingGoods();
    }, []);

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
                <div className="flex gap-4 mb-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded-full w-24"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
                    ))}
                </div>
            </div>
        );
    }

    // Render differently depending on group
    if (group === "first") {
        return (
            <div className="">
                {/* Hero Banner */}
                {heroProduct && (
                    <section className="relative overflow-hidden my-20 bg-gradient-to-r from-purple-600 to-blue-600 mb-10">
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="relative flex flex-col md:flex-row items-center justify-between p-6 md:p-10 lg:p-12">
                            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                                    <Tag className="w-4 h-4 mr-2" />
                                    Limited Time Offer
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                    Grab Up to 50% Off
                                    <span className="block text-yellow-300">Black Friday Deals</span>
                                </h1>
                                <p className="text-white/90 mb-6 text-lg">
                                    Don't miss out on our biggest sale of the year. Limited stock available!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        label={
                                            <div className="flex items-center">
                                                <span>Shop Now</span>
                                                <ChevronRight className="ml-2 w-4 h-4" />
                                            </div>
                                        }
                                        className="px-6 py-3 bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-lg"
                                        onClick={() => navigate("/products")}
                                    />
                                    <Button
                                        label="View All Deals"
                                        className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg"
                                        onClick={() => navigate("/deals")}
                                    />
                                </div>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="relative">
                                    <img
                                        src={heroProduct.thumbnail}
                                        alt={heroProduct.title}
                                        className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg">
                                        <div className="text-2xl font-bold text-purple-600">${heroProduct.price}</div>
                                        <div className="text-sm text-gray-600">Save ${(heroProduct.price * 0.5).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Categories Filter
                <div className="mb-10 z-0 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
                        <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                            View all
                            <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 ${index === 0
                                        ? "bg-purple-600 text-white shadow-lg"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* Featured Products */}
                <div className="mb-8 z-0 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Exclusive Offers</h2>
                            <p className="text-gray-600 mt-1">Limited time deals on top-rated products</p>
                        </div>
                        <Link
                            to="/products"
                            className="flex items-center text-purple-600 hover:text-purple-700 font-medium group"
                        >
                            See all products
                            <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <Link to={`/product/${item.id}`}>
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 left-3">
                                            {item.discountPercentage && (
                                                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                                    -{item.discountPercentage}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium px-2 py-1 text-blue-600 rounded-full">
                                                {item.category}
                                            </span>
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="ml-1 text-sm font-medium">{item.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-xl font-bold text-gray-900">${item.price}</div>
                                                {item.discountPercentage && (
                                                    <div className="text-sm text-gray-500 line-through">
                                                        ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                label={
                                                    <div className="flex items-center">
                                                        <ShoppingBag className="w-4 h-4 mr-2" />
                                                        Add
                                                    </div>
                                                }
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart(item);
                                                }}
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (group === "second") {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                        <TrendingUp className="w-4 h-4 mr-2 text-white" />
                        <span className="text-white font-medium">Trending Now</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Top Rated Products</h1>
                    <p className="text-gray-600">Carefully selected based on customer reviews and ratings</p>
                </div>

                <div className="space-y-6">
                    {displayedProducts.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="flex flex-col md:flex-row">
                                <Link to={`/product/${item.id}`} className="md:w-1/3">
                                    <div className="relative h-full">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {item.discountPercentage && (
                                            <div className="absolute top-4 left-4">
                                                <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                                                    Save {item.discountPercentage}%
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div className="flex-1 p-6">
                                    <div className="flex flex-col h-full">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                                    {item.category}
                                                </span>
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                                        {item.rating} ({item.stock} in stock)
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                                                <Link to={`/product/${item.id}`}>{item.title}</Link>
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    Fast shipping
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    1-year warranty
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                                                    {item.discountPercentage && (
                                                        <span className="text-lg text-gray-500 line-through">
                                                            ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    ${(item.price / 12).toFixed(2)}/month for 12 months
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    label={
                                                        <div className="flex items-center">
                                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View Details
                                                        </div>
                                                    }
                                                    onClick={() => navigate(`/product/${item.id}`)}
                                                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-lg font-medium"
                                                />
                                                <Button
                                                    label={
                                                        <div className="flex items-center">
                                                            <ShoppingBag className="w-4 h-4 mr-2" />
                                                            Add to Cart
                                                        </div>
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        addToCart(item);
                                                    }}
                                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}