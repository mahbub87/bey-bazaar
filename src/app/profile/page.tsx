"use client"

import { useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CurrencyContext } from "../contexts/CurrencyContext" // ✅ Import currency context
export const metadata = {
  title: "Your Profile | Beybazaar",
  description: "View your profile details and order history on Beybazaar. Manage your account and track past purchases easily.",
  keywords: [
    "user profile", "order history", "account settings", "Beybazaar profile", "purchase history", "ecommerce orders", "manage orders"
  ],
  openGraph: {
    title: "Your Profile | Beybazaar",
    description: "Access your order history and personal account details at Beybazaar.",
    url: "https://beybazaar.com/profile",
    siteName: "Beybazaar",
    images: [
      {
        url: "/profile-og.jpg", // update or replace with actual OG image
        width: 1200,
        height: 630,
        alt: "User Profile - Beybazaar",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Profile | Beybazaar",
    description: "Manage your profile and orders on Beybazaar with ease.",
    images: ["/profile-og.jpg"],
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const router = useRouter()

   const { currency } = useContext(CurrencyContext);
   const getPrice = (price: number) => {
    const rates: Record<string, number> = {
      CAD: 1,
      USD: 0.73,
      EUR: 0.68,
    };

    const symbols: Record<string, string> = {
      CAD: "$",
      USD: "$",
      EUR: "€",
    };

    const rate = rates[currency] || 1;
    const symbol = symbols[currency] || "$";

    return `${symbol}${(price * rate).toFixed(2)}`;
  };

  useEffect(() => {
    const getUserAndOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)

      const { data: ordersData, error } = await supabase
        .from("Orders")
        .select("*, Products(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching orders:", error)
      } else {
        setOrders(ordersData)
      }
    }

    getUserAndOrders()
  }, [])

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {user ? (
        <div className="rounded-lg p-6 mb-10 ">
          <h2 className="text-xl font-semibold mb-2">User Info</h2>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}

      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            const product = order.Products
            return (
              <div key={order.id} className="rounded-lg p-4">
                <Link href={`/${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-auto max-h-64 object-contain rounded-lg p-2"
                  />
                </Link>
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <div className="mt-2 text-sm">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p>
                    <strong>Total:</strong>{" "}
                    {getPrice(order.total_price)}
                  </p>
                  <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
                  <p className="text-gray-500">
                    Ordered on: {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  )
}
