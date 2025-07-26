# BeyBazaar

BeyBazaar is an e-commerce platform for purchasing third-party Beyblade-compatible products ("midfakes"). Built with Next.js, Supabase, Stripe, and TailwindCSS, it offers a modern shopping experience with secure authentication, dynamic product listings, and multi-currency support.

🔗 [Live Site](https://bey-bazaar.vercel.app/)

## Features

- **Product Catalog:** Browse and filter Beyblade-compatible products.
- **Shopping Cart:** Add items to your cart and checkout securely.
- **User Authentication:** Register, login, reset password, and manage your profile.
- **Order History:** View past orders and order details.
- **Multi-Currency Support:** Switch between CAD, USD, and EUR.
- **Contact Form:** Submit inquiries with optional image attachments.
- **Email Notifications:** Receive order confirmations and updates.
- **Policies:** Transparent refund, shipping, privacy, and terms of service pages.

## Tech Stack

- Next.js (App Router)
- Supabase (Database, Auth, Storage)
- Stripe (Payments)
- TailwindCSS (Styling)
- Nodemailer (Transactional Emails)
- Lucide React (Icons)

## Getting Started

1. **Clone the repository:**
   git clone https://github.com/mahbub87/bey-bazaar.git
   cd beybazaar

2. **Install dependencies:**
   npm install

3. **Configure environment variables:**
   - Copy .env.local.example to .env.local and fill in your Supabase, Stripe, and Gmail credentials.

4. **Run the development server:**
   npm run dev

5. **Build for production:**
   npm run build
   npm start

## Folder Structure

src/
  app/
    components/      # UI components (Navbar, Footer, ProductList, etc.)
    contexts/        # React context providers (Cart, Currency)
    lib/             # Supabase and mailer utilities
    api/             # API routes (checkout, contact, webhook)
    [id]/            # Dynamic product pages
    contact/         # Contact form page
    list/            # Product listing page
    login/           # Auth pages
    profile/         # User profile & order history
    refund/          # Refund policy page
    shipping/        # Shipping policy page
    success/         # Order success page
    tos/             # Terms of service page
    update-password/ # Password update page
  src/app/globals.css        # Global styles
  src/app/layout.tsx         # App layout
  src/app/page.js            # Home page

## Environment Variables

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL
- GMAIL_APP_PASSWORD

## Policies

- Refund Policy: /refund
- Shipping Policy: /shipping
- Privacy Policy: /privacy
- Terms of Service: /tos

## License

MIT

Powered by Next.js, Supabase, Stripe, and TailwindCSS.
