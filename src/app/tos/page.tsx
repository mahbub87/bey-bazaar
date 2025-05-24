export const metadata = {
  title: "Terms of Service | Beybazaar",
  description:
    "Read the full Terms of Service for Beybazaar. Learn about order fulfillment, product authenticity, payment processing, and legal disclaimers.",
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service | Beybazaar",
    description:
      "View Beybazaar’s terms regarding product authenticity, fulfillment, user accounts, refunds, and legal responsibilities.",
    url: "https://beybazaar.com/terms-of-service",
    siteName: "Beybazaar",
    images: [
      {
        url: "/terms-og.jpg", // Optional branded OG image
        width: 1200,
        height: 630,
        alt: "Terms of Service - Beybazaar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Beybazaar",
    description:
      "Understand your rights and obligations when shopping at Beybazaar.",
    images: ["/terms-og.jpg"],
  },
};

const TermsOfService = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="text-sm text-gray-500 text-center mb-12">Effective Date: May 22, 2025</p>

      <section className="space-y-8 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Description of Services</h2>
          <p>
            We operate an e-commerce platform that allows users to purchase third-party Beyblade-compatible products, referred to as “midfakes.” Upon receiving your order, we fulfill it by purchasing the requested product from external suppliers (primarily AliExpress) and arrange delivery directly to your provided address.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Product Authenticity Disclaimer</h2>
          <p>
            We do not claim that the products sold are genuine Takara Tomy, Hasbro, or Beyblade branded products. All buyers acknowledge that they are purchasing third-party compatible items not affiliated with any official manufacturer.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Use of Images and Intellectual Property</h2>
          <p>
            Product images and logos used on our site are for reference only and remain the property of their respective owners. We do not claim ownership. Contact us if you believe your content is being used improperly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Order Fulfillment and Shipping</h2>
          <p>
            All orders are fulfilled via third-party suppliers. Delivery times are estimates and may range from 20–30 business days. You agree that customs, tracking availability, and other shipping conditions are outside of our control.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. No Warranties / Condition of Goods</h2>
          <p>
            Products are shipped as-is from third-party vendors. We disclaim responsibility for defects, dissatisfaction, or differences from product images. Issues will be addressed on a case-by-case basis but refunds are not guaranteed.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Returns, Refunds, and Cancellations</h2>
          <p>
            All sales are final. Refunds may be issued only if a product does not arrive within 60 days or arrives damaged with proof provided within 5 days of delivery. All refund decisions are made at our sole discretion.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Payment Processing</h2>
          <p>
            Payments are securely processed via Stripe. By using our service, you agree to Stripe’s legal terms and privacy policy. We do not store your payment information directly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. User Accounts and Security</h2>
          <p>
            User accounts are managed through Supabase. You are responsible for keeping your credentials secure. We reserve the right to terminate accounts for misuse or fraud.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
          <p>
            We are not liable for indirect or consequential damages. Our total liability in connection with any product purchase shall not exceed the amount you paid for the product.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">10. Indemnification</h2>
          <p>
            You agree to indemnify and hold us harmless from any claims, damages, or legal actions resulting from your use of our services or violation of these Terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">11. Modifications to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued use of the Site constitutes your acceptance of the revised Terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Ontario, Canada. Any disputes will be handled in the courts of Ontario.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">13. Contact</h2>
          <p>
            For legal concerns or inquiries, contact us at <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TermsOfService;