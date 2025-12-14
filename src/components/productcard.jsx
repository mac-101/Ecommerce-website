import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Star, 
  Check, 
  Shield, 
  Truck, 
  RefreshCw, 
  ChevronLeft,
  ChevronRight,
  Package,
  CreditCard,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Button from "./button";
import { addToCart } from "./cartService";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(res.data);
                
                // Check if product is in wishlist
                const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                setIsWishlisted(wishlist.some(item => item.id === res.data.id));
            } catch (err) {
                console.error("Error fetching product:", err);
                toast.error("Failed to load product");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const totalPrice = product.price * quantity;
        const cartItem = { ...product, quantity, totalPrice };
        addToCart(cartItem);
        toast.success(`Added ${quantity} ${product.title} to cart`);
    };

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (isWishlisted) {
            const updatedWishlist = wishlist.filter(item => item.id !== product.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsWishlisted(false);
            toast.success("Removed from wishlist");
        } else {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setIsWishlisted(true);
            toast.success("Added to wishlist");
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href,
                });
                toast.success("Shared successfully");
            } catch (err) {
                console.log("Sharing cancelled");
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/checkout');
    };

    const nextImage = () => {
        if (product.images && product.images.length > 0) {
            setSelectedImage((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product.images && product.images.length > 0) {
            setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                        <div className="w-full h-96 bg-gray-200 rounded-2xl"></div>
                    </div>
                    <div className="lg:w-1/2 space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-12 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </button>
                        <Link to="/" className="hover:text-gray-900">Home</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <Link to="/products" className="hover:text-gray-900">Products</Link>
                        <ChevronRight className="w-4 h-4 mx-2" />
                        <span className="text-gray-900 font-medium truncate">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Images */}
                    <div className="lg:w-1/2">
                        <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                            {/* Main Image */}
                            <div className="relative overflow-hidden rounded-xl bg-gray-100">
                                <img
                                    src={product.images?.[selectedImage] || product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-96 object-contain"
                                />
                                
                                {/* Discount Badge */}
                                {product.discountPercentage > 0 && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                                            Save {product.discountPercentage}%
                                        </span>
                                    </div>
                                )}
                                
                                {/* Navigation Arrows */}
                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                                
                                {/* Image Counter */}
                                {product.images && product.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                                        {selectedImage + 1} / {product.images.length}
                                    </div>
                                )}
                            </div>
                            
                            {/* Thumbnail Gallery */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-purple-500' : 'border-gray-200'}`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.title} view ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            {/* Category & Brand */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                        {product.category}
                                    </span>
                                    {product.brand && (
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                                            {product.brand}
                                        </span>
                                    )}
                                </div>
                                
                                {/* Rating */}
                                <div className="flex items-center">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                        {product.rating} ({product.reviews?.length || 0} reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>

                            {/* Description */}
                            <div className="mb-6">
                                <div className={`text-gray-600 ${!showFullDescription && 'line-clamp-3'}`}>
                                    {product.description}
                                </div>
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-purple-600 hover:text-purple-700 font-medium text-sm mt-2 flex items-center"
                                >
                                    {showFullDescription ? (
                                        <>
                                            Show less <ChevronUp className="w-4 h-4 ml-1" />
                                        </>
                                    ) : (
                                        <>
                                            Read more <ChevronDown className="w-4 h-4 ml-1" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Price Section */}
                            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-4xl font-bold text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {product.discountPercentage > 0 && (
                                                <span className="text-xl text-gray-500 line-through">
                                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {product.stock > 0 ? (
                                                <span className="text-green-600 font-medium">
                                                    <Check className="w-4 h-4 inline mr-1" />
                                                    In stock ({product.stock} available)
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-medium">Out of stock</span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Total for {quantity} item(s)</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${(product.price * quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                            className="px-4 py-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                            disabled={quantity <= 1}
                                        >
                                            <span className="text-xl font-bold">-</span>
                                        </button>
                                        <span className="px-6 py-3 min-w-[80px] text-center text-xl font-bold">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(prev => prev + 1)}
                                            className="px-4 py-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                            disabled={quantity >= product.stock}
                                        >
                                            <span className="text-xl font-bold">+</span>
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {product.stock} items available
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                <Button
                                    label={
                                        <div className="flex items-center justify-center">
                                            <ShoppingBag className="w-5 h-5 mr-2" />
                                            Add to Cart
                                        </div>
                                    }
                                    onClick={handleAddToCart}
                                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                                />
                                <Button
                                    label="Buy Now"
                                    onClick={handleBuyNow}
                                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                                />
                            </div>

                            {/* Secondary Actions */}
                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={toggleWishlist}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isWishlisted ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Truck className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="font-medium text-sm">Free Shipping</p>
                                        <p className="text-xs text-gray-500">3-5 business days</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-sm">2-Year Warranty</p>
                                        <p className="text-xs text-gray-500">Full coverage</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <RefreshCw className="w-6 h-6 text-purple-600" />
                                    <div>
                                        <p className="font-medium text-sm">30-Day Returns</p>
                                        <p className="text-xs text-gray-500">Easy returns</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <CreditCard className="w-6 h-6 text-orange-600" />
                                    <div>
                                        <p className="font-medium text-sm">Secure Payment</p>
                                        <p className="text-xs text-gray-500">SSL encrypted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information Tabs */}
                <div className="mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <div className="flex overflow-x-auto">
                                {['description',  'reviews', 'shipping'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-shrink-0 px-6 py-4 font-medium text-sm transition-colors ${activeTab === tab
                                                ? 'text-purple-600 border-b-2 border-purple-600'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'description' && (
                                <div>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {Object.entries(product).map(([key, value]) => {
                                            if (typeof value === 'string' || typeof value === 'number') {
                                                return (
                                                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                                                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                                        <span className="font-medium">{value}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            )}
                            
                           
                            
                            {activeTab === 'reviews' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                                <span className="ml-2 text-2xl font-bold">{product.rating}</span>
                                            </div>
                                            <p className="text-gray-600 mt-1">Based on {product.reviews?.length || 0} reviews</p>
                                        </div>
                                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                            Write a Review
                                        </button>
                                    </div>
                                    {/* Reviews would go here */}
                                    <div className="text-center py-8 text-gray-500">
                                        <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>No reviews yet. Be the first to review this product!</p>
                                    </div>
                                </div>
                            )}
                            
                            {activeTab === 'shipping' && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-bold text-gray-900 mb-2">Free Shipping</h4>
                                        <p className="text-gray-600">This item qualifies for free shipping on orders over $50.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <p className="font-bold text-gray-900">Standard Shipping</p>
                                            <p className="text-gray-600 text-sm mt-1">3-5 business days</p>
                                            <p className="text-gray-900 font-medium mt-2">$5.99</p>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <p className="font-bold text-gray-900">Express Shipping</p>
                                            <p className="text-gray-600 text-sm mt-1">1-2 business days</p>
                                            <p className="text-gray-900 font-medium mt-2">$14.99</p>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <p className="font-bold text-gray-900">Free Shipping</p>
                                            <p className="text-gray-600 text-sm mt-1">On orders over $50</p>
                                            <p className="text-gray-900 font-medium mt-2">Free</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}