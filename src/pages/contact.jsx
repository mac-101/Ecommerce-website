import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill out all fields");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/xanpggke", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                }),
            });

            if (response.ok) {
                toast.success("Message sent successfully!");
                setForm({ name: "", email: "", message: "" });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <Toaster
            position="top-right"
            />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">Contact Us</h2>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />

                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded transition-colors"
                >
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}