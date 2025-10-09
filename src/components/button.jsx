// src/components/button.jsx
function Button({ label = "Add to Cart", onClick }) {
  return (
    <button
      onClick={onClick}   // ✅ now it can run a function when clicked
      className="btn rounded-[40px] py-2 px-5 w-fit text-sm font-bold text-gray-800 border hover:bg-green-900 hover:text-white"
    >
      {label}
    </button>
  );
}

export default Button;