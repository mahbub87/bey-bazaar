import React from 'react';

const RefundPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-12">Effective Date: May 22, 2025</p>

      <section className="space-y-8 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
          <p>
            Due to the nature of our fulfillment model (dropshipping from third-party suppliers), all sales are considered final. However, we do offer limited refunds under specific circumstances described below.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Eligibility for Refunds</h2>
          <ul className="list-disc pl-6">
            <li>The product did not arrive within 60 days of your order date.</li>
            <li>The product arrived significantly damaged or broken (photo proof required within 5 days of delivery).</li>
            <li>You received the wrong item (e.g., wrong model or color).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Non-Refundable Situations</h2>
          <ul className="list-disc pl-6">
            <li>Change of mind or buyer’s remorse.</li>
            <li>Incorrect address provided by the buyer.</li>
            <li>Minor packaging damage that does not affect product use.</li>
            <li>Delays due to customs or local postal issues beyond our control.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Requesting a Refund</h2>
          <p>
            To request a refund, email <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a> or use the contact form within 5 days of receiving the product (or after 60 days if undelivered). Include:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Your order number</li>
            <li>Description of the issue</li>
            <li>Clear photographic evidence (if applicable)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Refund Method</h2>
          <p>
            If your request is approved, your refund will be issued via the original payment method used at checkout. Refund processing may take 5–10 business days depending on your bank or card provider.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Chargebacks and Fraud</h2>
          <p>
            Filing false claims or chargebacks without contacting us first may result in account suspension. We report fraudulent activity to payment processors and relevant authorities.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
          <p>
            If you have any questions or concerns about this policy, contact us at <a href="mailto:beybazaarbb@gmail.com" className="text-blue-600 underline">beybazaarbb@gmail.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default RefundPolicy;
