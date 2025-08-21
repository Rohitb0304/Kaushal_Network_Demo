import React from 'react';

const Cancellation = () => {
  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold text-blue-700 mt-10 text-center">
          Cancellation & Refund Policy
        </h2>
        <p className="text-sm text-gray-500 text-center">Effective Date: July 20, 2025</p>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">1. Policy Purpose</h3>
        <p>
          This Cancellation & Refund Policy clarifies the terms under which orders, transactions,
          and subscriptions on the Kaushal Network platform may be cancelled and/or refunded.
        </p>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">2. Platform’s Role</h3>
        <div className="platform-role-section">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Kaushal Network</strong> is a digital intermediary connecting buyers, sellers,
              and service providers.
            </li>
            <li>
              The platform does not directly sell, ship, or purchase goods/services and, therefore,
              is not a party to business contracts entered into by users.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">3. Cancellation of Orders</h3>
        <div className="order-cancellation-section">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Order Cancellation:</strong> Buyers and sellers may mutually agree to cancel
              transactions before shipment or fulfillment, subject to their own terms of engagement.
            </li>
            <li>
              <strong>Process:</strong>
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>Buyers must notify sellers directly if they wish to cancel an order.</li>
                <li>
                  Sellers are responsible for confirming any cancellation and updating order status
                  on the platform.
                </li>
              </ul>
            </li>
            <li>
              <strong>Subscription Services:</strong> Cancellations for paid subscriptions (such as
              feature boosts, premium listings) must be initiated via the user dashboard or by email
              within the specified window, if applicable.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">4. Refunds</h3>
        <div className="refund-policy-section">
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Marketplace Transactions:</strong>
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>
                  Refunds for goods/services are strictly governed by the agreement between the
                  buyer and seller.
                </li>
                <li>
                  Kaushal Network is not responsible for or authorized to process refunds for
                  marketplace transactions.
                </li>
                <li>
                  Any refund request must be resolved directly between the buyer and seller,
                  including the return of items, if applicable.
                </li>
              </ul>
            </li>

            <li>
              <strong>Platform Fees & Subscriptions:</strong>
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>
                  Fees charged by Kaushal Network for digital services or subscriptions are
                  typically non-refundable once payment is received, unless explicitly specified in
                  the terms of the paid service.
                </li>
                <li>
                  Exceptions (if any) and the process will be clearly stated in the subscription
                  agreement.
                </li>
              </ul>
            </li>

            <li>
              <strong>Processing Timeline:</strong>
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>
                  Where a refund is approved by the seller or the platform, payment reversal will be
                  processed to the original mode of payment.
                </li>
                <li>
                  Refund processing timelines may vary based on payment gateway or banking channels.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">5. Disputes</h3>
        <div className="dispute-resolution-section">
          <ul className="list-disc list-inside space-y-4">
            <li>
              In the event of disagreements between transaction parties, users are encouraged to:
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>
                  Open direct communication and provide all necessary supporting documentation.
                </li>
                <li>Attempt resolution in good faith as per their own business terms.</li>
              </ul>
            </li>
            <li>
              If assistance is needed, users may contact Kaushal Network’s Grievance Redressal
              Officer.
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                <li>
                  The platform may offer to facilitate communication but does not arbitrate or
                  guarantee cancellations or refunds.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">6. No Platform Guarantee</h3>
        <div className="platform-liability-section">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Kaushal Network does not provide any independent guarantee or offer
              refunds/cancellations for goods or services listed by third parties.
            </li>
            <li>
              The platform bears no responsibility for seller performance, quality, or financial
              settlements.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">7. User Responsibilities</h3>
        <div className="user-responsibilities-section">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Before entering any transaction, users should review and affirm the seller’s
              individual cancellation or refund policy.
            </li>
            <li>
              All agreements relating to cancellations or refunds must be documented in writing for
              future reference.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">8. Contact</h3>
        <p>For further queries or to report a complaint:</p>
        <p>
          <strong>Grievance Redressal Officer:</strong>
          <br />
          Mr. Harshal Mandhane
          <br />
          Email:{' '}
          <a href="mailto:grievance@kaushalnetwork.in" className="text-blue-500 underline">
            grievance@kaushalnetwork.in
          </a>
          <br />
          Resolution timeline: 15 business days
        </p>

        <p className="mt-4">
          This Cancellation & Refund Policy serves Kaushal Network platform users and is subject to
          change. Please review periodically for updates.
        </p>
      </section>
    </div>
  );
};

export default Cancellation;
