import Link from "next/link";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen  px-6 py-12 text-center text-gray-200">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-base mb-6 max-w-md">
        Your order has been placed successfully. We’ve sent a confirmation email with the details. You’ll receive another email once your items have shipped.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
        >
          Back to Home
        </Link>
        <Link
          href="/profile" // Change this if you don't have an order history page
          className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-black transition"
        >
          View Order History
        </Link>
      </div>
    </main>
  );
};

export default SuccessPage;
