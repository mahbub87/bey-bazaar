import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, imageUrls } = await req.json()

    const formattedImages = imageUrls?.map((url: string) => `• ${url}`).join("\n") || ""

    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nAttached Images:\n${formattedImages}`

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["beybazaarbb@gmail.com"],
      subject: `Contact Form: ${subject}`,
      replyTo: email,
      text,
    })

    return Response.json({ success: true, data })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 })
  }
}
