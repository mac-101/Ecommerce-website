import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [sideNav, setSideNav] = useState(false);

  const hideNav = () => {
    setSideNav(false);
  };

  const toggleSideNav = () => {
    setSideNav((prev) => !prev);
  };

  // Optional: auto-hide sidebar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sideNav) {
        setSideNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sideNav]);

  const NavContent = (
    <>
      <nav className={`flex ${sideNav ? "flex-col my-10" : ""} items-center font-semibold gap-10 cursor-pointer`}>
        <p onClick={hideNav} className="hover:text-green-950 hover:font-bold">Category</p>
        <p className="hover:text-green-950 hover:font-bold">Deals</p>
        <p className="hover:text-green-950 hover:font-bold">What's New</p>
        <p className="hover:text-green-950 hover:font-bold">Delivery</p>
        <Link to="/cart">
          <button className="text-green-950 font-bold flex hover:font-extrabold items-center gap-2 mt-2">
            <i className="ri-shopping-cart-line"></i>
            Cart
          </button>
        </Link>
      </nav>

      <div className="flex items-center bg-gray-400 rounded-2xl px-3 mt-2">
        <i className="ri-search-line text-gray-700"></i>
        <input
          type="search"
          className="bg-transparent px-2 py-2 outline-none w-full"
          placeholder="Search Product"
        />
      </div>

      <button className={`font-bold ${sideNav ? "absolute bottom-10" : ""} flex items-center gap-2 mt-2`}>
        <i className="ri-user-line"></i>
        Account
      </button>
    </>
  );

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center py-5 fixed top-0 w-full shadow px-5 z-0 bg-white">
        <Link to="/">
          <h1 className="text-green-950 font-bold text-2xl">Shopcart</h1>
        </Link>

        {/* Horizontal Nav: only on large screens */}
        <div className="hidden lg:flex items-center gap-10">{NavContent}</div>

        {/* Right side icons */}
        <div className="flex gap-5">
          <Link to="/cart">
            <button className="text-green-950 font-bold flex hover:font-extrabold items-center gap-2 mt-2">
              <i className="ri-shopping-cart-line"></i>
              Cart
            </button>
          </Link>
          <button
            onClick={toggleSideNav}
            className="block lg:hidden text-2xl text-green-950"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </div>

      {/* Sidebar: only on small screens and when toggled */}
      {sideNav && (
        <div className="fixed top-0 right-0 w-full max-w-75 h-full bg-white shadow-lg z-40 p-5 lg:hidden transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-950">Menu</h2>
            <button onClick={toggleSideNav} className="text-xl">
              <i className="ri-close-line"></i>
            </button>
          </div>
          {NavContent}
        </div>
      )}
    </>
  );
}