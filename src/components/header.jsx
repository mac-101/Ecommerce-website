import { Link } from "react-router-dom"


export default function Header() {

    return (
        <>
            <div className="flex justify-between py-5 border-b px-5">
                <Link to="/">
                    <h1 className="text-green-950 font-bold text-2xl">Shopcart</h1>
                </Link>
                <input type="search" className="rounded-3xl bg-gray-300 px-2 max-w-50 w-full" placeholder="Search Product" />
                <Link to="/cart">
                    <button className="text-green-950 font-bold">View Cart</button>
                </Link>
            </div>
        </>
    )
}