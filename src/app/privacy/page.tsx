export const metadata = {
  title: "Privacy Policy | Beybazaar",
  description: "Learn how Beybazaar collects, uses, and protects your personal data. Read our full privacy policy including information on data security, cookies, and user rights.",
  keywords: [
    "privacy policy", "Beybazaar privacy", "data protection", "user rights", "cookies policy", 
    "personal information", "data sharing", "Stripe privacy", "ecommerce privacy"
  ],
  openGraph: {
    title: "Privacy Policy | Beybazaar",
    description: "Read Beybazaar's full privacy policy covering data collection, sharing, and your rights.",
    url: "https://beybazaar.com/privacy-policy",
    siteName: "Beybazaar",
    images: [
      {
        url: "/og-image.jpg", // replace with a privacy-appropriate OG image if needed
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Beybazaar",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Beybazaar",
    description: "Your data matters. Learn how we protect your privacy at Beybazaar.",
    images: ["/og-image.jpg"],
  },
};

const PrivacyPolicy = () => {
  
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-12">Effective Date: May 22, 2025</p>

      <section className="space-y-8 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <p>
            We collect basic account information such as your name, email address, and shipping address when you create an account or place an order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Payment Information</h2>
          <p>
            We do <strong>not</strong> collect or store any credit card or payment information on our servers. All payment transactions are processed securely by Stripe. Your payment details are handled in accordance with <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Stripe&apos;s Privacy Policy</a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. How We Use Your Information</h2>
          <ul className="list-disc pl-6">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your account or orders</li>
            <li>To improve and personalize our services</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your data with service providers (such as shipping couriers) solely to fulfill your order. We may disclose information if required by law.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
          <p>
            We implement standard security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. To request changes, contact us at <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Cookies</h2>
          <p>
            We may use cookies to improve user experience, store login status, and analyze site usage. You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
