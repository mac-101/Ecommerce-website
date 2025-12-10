import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Truck, 
  Shield, 
  ChevronRight,
  MapPin,
  Edit2,
  CheckCircle,
  Gift,
  Phone,
  User
} from "lucide-react";

export default function Checkout() {
    const [checkoutGoods, setCheckoutGoods] = useState([]);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [demoAddress, setDemoAddress] = useState("");
    const [showInput, setShowInput] = useState(false);

    const fetchCartProducts = () => {
        const stored = localStorage.getItem("cart");
        const cartItems = stored ? JSON.parse(stored) : [];
        setCheckoutGoods(cartItems);
    };

    // Calculate totals
    const getSubTotal = () => {
        return checkoutGoods.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const getTax = () => {
        const subTotal = getSubTotal();
        return subTotal * 0.10;
    };

    const getTotal = () => {
        const subTotal = getSubTotal();
        const tax = getTax();
        return subTotal + tax;
    };

    const getSavings = () => {
        return checkoutGoods.reduce((sum, item) => {
            if (item.discountPercentage) {
                const originalPrice = item.price / (1 - item.discountPercentage / 100);
                return sum + (originalPrice - item.price) * item.quantity;
            }
            return sum;
        }, 0);
    };

    const editAddress = () => {
        setShowInput(true);
        setDemoAddress(address);
    };

    const submitAddress = () => {
        if (demoAddress.trim() === "") {
            toast.error("Please enter a valid address");
            return;
        }
        setAddress(demoAddress);
        setShowInput(false);
        toast.success("Address updated successfully");
    };

    const amount = Math.floor(getTotal() * 100);

    const validateForm = () => {
        if (!email) {
            toast.error("Please enter your email");
            return false;
        }
        if (!address) {
            toast.error("Please enter your address");
            return false;
        }
        if (!name) {
            toast.error("Please enter your name");
            return false;
        }
        if (!phone) {
            toast.error("Please enter your phone number");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        return true;
    };

    const handlePaystackPayment = () => {
        if (!validateForm()) return;

        setIsLoading(true);
        
        const paystack = window.PaystackPop.setup({
            key: import.meta.env.VITE_PAYSTACK_API,
            email: email,
            amount: amount,
            currency: "NGN",
            ref: `${Date.now()}`,
            metadata: {
                customer_name: name,
                customer_phone: phone,
                shipping_address: address,
                items: checkoutGoods.map(item => ({
                    id: item.id,
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price
                }))
            },
            callback: function (response) {
                setIsLoading(false);
                toast.success("Payment Successful! Your order is being processed.");
                
                // Clear cart on successful payment
                localStorage.removeItem("cart");
                window.dispatchEvent(new Event("cartUpdated"));
                
                setTimeout(() => {
                    navigate("/payment-success", {
                        state: { 
                            amount: getTotal(),
                            orderId: response.reference,
                            items: checkoutGoods
                        },
                    });
                }, 1500);
            },
            onClose: function () {
                setIsLoading(false);
                toast.error("Payment Cancelled");
            },
        });

        paystack.openIframe();
    };

    const handleTestPayment = () => {
        if (!validateForm()) return;
        
        // Simulate successful payment for testing
        toast.success("Test Payment Successful!");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        
        setTimeout(() => {
            navigate("/payment-success", {
                state: { 
                    amount: getTotal(),
                    orderId: `TEST-${Date.now()}`,
                    items: checkoutGoods
                },
            });
        }, 1500);
    };

    useEffect(() => {
        fetchCartProducts();
        // Load saved user info if available
        const savedInfo = localStorage.getItem("checkoutInfo");
        if (savedInfo) {
            const info = JSON.parse(savedInfo);
            setAddress(info.address || "");
            setEmail(info.email || "");
            setPhone(info.phone || "");
            setName(info.name || "");
        }
    }, []);

    // Save user info when it changes
    useEffect(() => {
        const info = { address, email, phone, name };
        localStorage.setItem("checkoutInfo", JSON.stringify(info));
    }, [address, email, phone, name]);

    if (checkoutGoods.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Gift className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add items to your cart to proceed to checkout</p>
                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
            
            {/* Progress Bar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                    1
                                </div>
                                <span className="ml-2 font-medium text-gray-900">Shipping</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold">
                                    2
                                </div>
                                <span className="ml-2 font-medium text-gray-600">Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="lg:flex lg:space-x-8">
                    {/* Left Column - Forms */}
                    <div className="lg:w-2/3 space-y-8">
                        {/* Contact Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <User className="w-5 h-5 mr-2 text-gray-400" />
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                                    Shipping Address
                                </h2>
                                {address && !showInput && (
                                    <button
                                        onClick={editAddress}
                                        className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        <Edit2 className="w-4 h-4 mr-1" />
                                        Edit
                                    </button>
                                )}
                            </div>
                            
                            {showInput ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={demoAddress}
                                        onChange={(e) => setDemoAddress(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your complete address including street, city, state, and zip code"
                                        rows="3"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            onClick={submitAddress}
                                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                                        >
                                            Save Address
                                        </button>
                                        <button
                                            onClick={() => setShowInput(false)}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : address ? (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="font-medium">{name}</p>
                                            <p className="text-gray-600">{address}</p>
                                            <p className="text-gray-600">{phone}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={editAddress}
                                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center"
                                >
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Add Shipping Address
                                </button>
                            )}
                        </div>

                        

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items ({checkoutGoods.length})</h2>
                            <div className="space-y-4">
                                {checkoutGoods.map((item) => (
                                    <div key={item.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-16 h-16 object-contain rounded bg-gray-100 p-1"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <p className="font-bold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:w-1/3 mt-8 lg:mt-0">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">${getSubTotal().toFixed(2)}</span>
                                    </div>
                                    
                                    {getSavings() > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discounts</span>
                                            <span className="font-medium">-${getSavings().toFixed(2)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (10%)</span>
                                        <span className="font-medium">${getTax().toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-gray-900">
                                                ${getTotal().toFixed(2)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Including VAT and shipping
                                        </p>
                                    </div>
                                </div>

                                {/* Security Badges */}
                                <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                                    <div className="flex items-center">
                                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                                        <span className="text-sm font-medium">Secure Payment</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Lock className="w-5 h-5 text-blue-600 mr-2" />
                                        <span className="text-sm font-medium">256-bit SSL</span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={paymentMethod === "test" ? handleTestPayment : handlePaystackPayment}
                                    disabled={isLoading || !address || !email || !name || !phone}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${isLoading || !address || !email || !name || !phone
                                            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        `Place Order · $${getTotal().toFixed(2)}`
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-500 mt-4">
                                    By placing your order, you agree to our Terms of Service and Privacy Policy
                                </p>

                                {/* Shipping Info */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center text-gray-600">
                                        <Truck className="w-5 h-5 mr-2" />
                                        <div>
                                            <p className="font-medium">Free Shipping</p>
                                            <p className="text-sm">Estimated delivery: 3-5 business days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Need Help */}
                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Contact our support team for assistance with your order
                                </p>
                                <button className="text-sm font-medium text-purple-600 hover:text-purple-700">
                                    Contact Support →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}