import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function PaymentSuccess() {
    const location = useLocation();
    const amount = location.state?.amount || 0;

    useEffect(() => {
        localStorage.clear();

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event("cartUpdated"));

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-green-50 px-4 py-10">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
                <div className="text-green-600 text-5xl mb-4">
                    <i className="ri-check-line"></i>
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful</h2>
                <p className="text-gray-600 mb-6">Thank you for your purchase!</p>

                <div className="text-left text-sm text-gray-700 space-y-2 mb-6">
                    <p><strong>Payment Method:</strong> Visa</p>
                    <p><strong>Amount:</strong> N{amount.toFixed(2)}</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Reference:</strong> #PAY-{Date.now()}</p>
                </div>

                <Link to="/">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full">
                        Shop More
                    </button>
                </Link>
            </div>
        </div>
    );
}