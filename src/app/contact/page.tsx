"use client"

import { useState } from "react"
import Image from "next/image"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setForm({ name: "", email: "", subject: "", message: "" })
      setSuccess(true)
    }

    setLoading(false)
  }

  const inputClass =
    "flex-1 bg-transparent outline-none text-white placeholder-gray-400"

  const boxStyle = {
    backgroundColor: "#383434",
  }

  return (
    <div className="min-h-screen  text-white p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
        <p className="text-sm text-gray-400 mb-6">
          Fill out the form below to get in touch. Include your <strong>Order ID</strong> if applicable.
        </p>

        {/* Name */}
        <div className="flex ic justify-between gap-4 p-2 rounded-md" style={boxStyle}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className={inputClass}
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="flex ic justify-between gap-4 p-2 rounded-md" style={boxStyle}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className={inputClass}
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Subject */}
        <div className="flex ic justify-between gap-4 p-2 rounded-md" style={boxStyle}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className={inputClass}
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div className="flex ic justify-between gap-4 p-2 rounded-md" style={boxStyle}>
          <textarea
            name="message"
            placeholder="Your Message (include Order ID if needed)"
            className={`${inputClass} resize-none h-32`}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-green-400 mt-4 text-center">Your message has been sent!</p>
        )}
      </form>
    </div>
  )
}

export default Contact
