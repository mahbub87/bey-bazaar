"use client";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
export const metadata = {
  title: "Login or Register | Access Your Beybazaar Account",
  description: "Log in to your Beybazaar account or register for a new one to start shopping. Forgot your password? Easily reset it here.",
  keywords: [
    "login", "register", "sign up", "Beybazaar login", "reset password", "account access",
    "Beyblade store login", "create account Beybazaar"
  ],
  openGraph: {
    title: "Login or Register | Access Your Beybazaar Account",
    description: "Securely log in or create a new account on Beybazaar to shop the latest Beyblades. Password reset available.",
    url: "https://beybazaar.com/login",
    siteName: "Beybazaar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Login or Register at Beybazaar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login or Register | Beybazaar",
    description: "Access your Beybazaar account to shop exclusive Beyblade deals or reset your password.",
    images: ["/og-image.jpg"],
  },
};

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
}

const LoginPage = () => {
  const router = useRouter();
  const [mode, setMode] = useState<MODE>(MODE.LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : "Reset Your Password";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : "Reset";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === MODE.LOGIN) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Logged in successfully!");
        router.refresh();
        router.push("/"); 
      }

      if (mode === MODE.REGISTER) {
        if (password !== retypePassword) {
          setError("Passwords do not match.");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        setMessage("Registration successful! Please check your email for confirmation.");
        router.push("/login"); 
        router.refresh();
        
      }

      if (mode === MODE.RESET_PASSWORD) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "https://bey-bazaar.vercel.app/update-password",
        });
        if (error) throw error;
        setMessage("Password reset email sent!");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 flex items-center justify-center">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">{formTitle}</h1>

        {/* Email Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">E-mail</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@gmail.com"
            className="ring-2 ring-gray-300 rounded-md p-4"
            required
          />
        </div>

        {/* Password Input */}
        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              required
            />
          </div>
        )}

        {/* Retype Password for Register */}
        {mode === MODE.REGISTER && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Retype Password</label>
            <input
              type="password"
              name="retypePassword"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Retype your password"
              className="ring-2 ring-gray-300 rounded-md p-4"
              required
            />
          </div>
        )}

        {/* Reset Password Link */}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-white text-black p-2 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>

        {/* Messages */}
        {error && <div className="text-red-600">{error}</div>}
        {message && <div className="text-green-600 text-sm">{message}</div>}

        {/* Navigation Links */}
        {mode === MODE.LOGIN && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            {"Don't"} have an account?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div
            className="text-sm underline cursor-pointer"
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
