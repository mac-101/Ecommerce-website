export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 mt-10">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Left Section */}
                <div className="text-sm text-center sm:text-left">
                    &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
                </div>

                {/* Right Section */}
                <div className="flex gap-4 text-sm">
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    )
}