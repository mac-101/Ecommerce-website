import { useState, useEffect } from "react";

export default function Checkout() {
    const [checkoutGoods, setCheckoutGoods] = useState([]);
    const [address, setAddress] = useState("");
    const [demoAddress, setDemoAddress] = useState(""); // ✅ fixed typo
    const [showInput, setShowInput] = useState(false);   // controls input visibility

    const fetchCartProducts = () => {
        const stored = localStorage.getItem("cart");
        const cartItems = stored ? JSON.parse(stored) : [];
        setCheckoutGoods(cartItems);
        console.log(cartItems);
    };

    // 1️⃣ Subtotal: total of all goods
    const getSubTotal = (checkoutGoods) => {
        return checkoutGoods.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    // 2️⃣ Tax: 10% of subtotal
    const getTax = (checkoutGoods) => {
        const subTotal = getSubTotal(checkoutGoods);
        return subTotal * 0.10;
    };

    // 3️⃣ Total: subtotal + tax
    const getTotal = (checkoutGoods) => {
        const subTotal = getSubTotal(checkoutGoods);
        const tax = getTax(checkoutGoods);
        return subTotal + tax;
    };
    const editAddress = () => {
        setShowInput(true); // show input field
    };

    const submit = () => {
        setAddress(demoAddress); // save input to address
        setShowInput(false); // hide input field
        setDemoAddress("")

    };

    useEffect(() => {
        fetchCartProducts();
    }, []);

    return (
        <>
            <div className="border-2 border-gray-200 my-6 rounded-lg mx-3">
                <h1 className="font-bold text-2xl md:text-3xl">Review items and Shipping</h1>
                <ul>
                    {checkoutGoods.map((goods) => (
                        <li key={goods.id} className="flex items-center w-full my-2 justify-between font-semibold px-2">
                            <div className="flex items-center">
                                <img className="w-20 rounded-lg bg-gray-200 m-1" src={goods.thumbnail} alt={goods.title} />
                                <h1 className="text-md md:text-lg p-2 md:p-5 font-bold">{goods.title}</h1>
                            </div>
                            <div>
                                <p>${goods.price}</p>
                                <p className="text-sm">Quantity: {goods.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="m-3 my-6 p-3 border-2 border-gray-200 rounded-lg">
                <h1 className="font-bold text-2xl md:text-3xl mb-2">Delivery Information</h1>

                {!showInput ? (
                    <button onClick={editAddress} className="py-0.5 px-3 bg-gray-300 rounded-xl font-semibold mb-2">
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-5">
                        <input
                            type="text"
                            value={demoAddress}
                            onChange={(e) => setDemoAddress(e.target.value)}
                            className="bg-gray-200 px-2 py-1 rounded-md block mb-2"
                            placeholder="Enter your address"
                        />
                        <button onClick={submit} className="py-1 px-3 bg-gray-300 rounded-xl font-semibold mb-2">
                            Save
                        </button>
                    </div>
                )}

                <p>{address}</p>
            </div>

            <div className="m-3 flex flex-col p-3 my-6 border-2 border-gray-200 rounded-lg">
                <h1 className="font-bold text-2xl md:text-3xl">Order Summery</h1>

                <div className="flex pl-1 bg-gray-400 rounded-3xl p-1 mt-10 justify-between" >
                    <input type="text" placeholder="Enter coupon code" className="w-full p-1 border-0" />
                    <button className="py-1 text-white rounded-3xl w-40 px-3 bg-green-700">Apply Coupon</button>
                </div>

                <h1 className="font-bold textlg md:text-xl my-10">Payment Details</h1>

                <div className="pb-10">
                    <div className="p-1 font-semibold"><input type="checkbox" /> Cash on Delivery</div>
                    <div className="p-1 font-semibold"><input type="checkbox" /> Shopcart Card</div>
                    <div className="p-1 font-semibold"><input type="checkbox" /> Paypal</div>
                    <div className="p-1 font-semibold"><input type="checkbox" /> Credit or Debit card</div>
                </div>
                <label htmlFor="email" className="text-sm font-semibold">Email*</label>
                <input type="text" id="email" className="bg-gray-200 p-2 my-1 mb-5" placeholder="Email" />

                <label htmlFor="name" className="text-sm font-semibold">Card Holder Name*</label>
                <input type="text" id="name" className="bg-gray-200 p-2 my-1 mb-5" placeholder="Type here..." />

                <label htmlFor="number" className="text-sm font-semibold">Card Number*</label>
                <input type="number" id="number" className="bg-gray-200 p-2 my-1" placeholder="0000****1234" />


                <div className="space-y-3 my-10">
                    <div className="flex justify-between font-bold">
                        <p>Sub Total:</p>
                        <p className="text-right">${getSubTotal(checkoutGoods).toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between font-bold">
                        <p>Tax (10%):</p>
                        <p className="text-right">${getTax(checkoutGoods).toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between text-lg font-bold border-t border-b py-5 mt-2">
                        <p>Total:</p>
                        <p className="text-right">${getTotal(checkoutGoods).toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex gap-10 justify-end items-center text-lg font-bold my-2">
                    <p className="">${getTotal(checkoutGoods).toFixed(2)}</p>
                    <button className="py-2 px-4 bg-gray-400 rounded-2xl">Checkout</button>
                </div>
            </div>
        </>
    );
}