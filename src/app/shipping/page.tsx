import React from 'react';

const ShippingPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-12">Effective Date: May 22, 2025</p>

      <section className="space-y-8 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Order Processing</h2>
          <p>
            Orders are typically processed within 1–3 business days. You will receive an email confirmation once your order has been shipped.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Shipping Times</h2>
          <p>
            As we source and fulfill orders directly from our international suppliers, shipping times vary by location:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li><strong>United States & Canada:</strong> 15–30 business days</li>
            <li><strong>Europe:</strong> 30–40 business days</li>
            <li><strong>Rest of the World:</strong> 30–60 business days</li>
          </ul>
          <p className="mt-2">
            Shipping times may vary due to customs delays, holidays, or unexpected carrier issues. We appreciate your patience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Shipping Costs</h2>
          <p>
            Shipping fees (if any) will be calculated and displayed at checkout. We offer free shipping on select products and promotions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Tracking Your Order</h2>
          <p>
            Once your order ships, you will receive a tracking number via email (if available). Please allow a few days for the tracking information to update.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Delayed or Lost Shipments</h2>
          <p>
            If your package has not arrived within 60 days of the shipping date, contact us at <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a> or use the contact form. We will do our best to investigate and resolve the issue.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Customs, Duties, and Taxes</h2>
          <p>
            Customers are responsible for any customs fees, import duties, or taxes imposed by their local government. We are not responsible for delays or charges due to customs processing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Incorrect Addresses</h2>
          <p>
            Please ensure that your shipping address is correct at checkout. We are not responsible for orders shipped to incorrectly entered addresses. If you realize a mistake, contact us as soon as possible.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have any questions about shipping, email us at <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ShippingPolicy;
