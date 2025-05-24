"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
export const metadata = {
  title: "Update Password | Beybazaar",
  description: "Securely update your Beybazaar account password. Keep your account safe and up to date with a new password.",
  robots: "noindex, nofollow", 
  openGraph: {
    title: "Update Password | Beybazaar",
    description: "Change your account password securely on Beybazaar.",
    url: "https://beybazaar.com/update-password",
    siteName: "Beybazaar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Update Password | Beybazaar",
    description: "Securely change your password at Beybazaar.",
  },
};

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setMessage("");
    setError("");
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully!");
      setTimeout(() => router.push("/"), 1500);
    }

    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 flex items-center justify-center">
      <form
        className="flex flex-col gap-8 w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <h1 className="text-2xl font-semibold">Update Your Password</h1>

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="ring-2 ring-gray-300 rounded-md p-4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-white text-black p-2 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>

        {/* Messages */}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {message && <div className="text-green-600 text-sm">{message}</div>}
      </form>
    </div>
  );
}
