import { sendContactMail } from "../../lib/contactMailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, imageUrls } = await req.json();

    const formattedImages = imageUrls?.map((url: string) => `• ${url}`).join("\n") || "";

    const text = `
Name: ${name}
Email: ${email}

Message:
${message}

Attached Images:
${formattedImages}
    `;

    const data = await sendContactMail({
      to: "beybazaarbb@gmail.com",
      subject: `Contact Form: ${subject}`,
      text,
      replyTo: email,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
