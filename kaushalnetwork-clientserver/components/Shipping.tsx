import React from 'react';

const Shipping = () => {
  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold text-blue-700 mt-10 text-center">
          Shipping & Delivery Policy
        </h2>
        <p className="text-sm text-gray-500 text-center">Effective Date: July 20, 2025</p>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">1. Policy Overview</h3>
        <p>
          TThis Shipping & Delivery Policy outlines how shipping and delivery are managed for
          transactions conducted through the Kaushal Network platform. The policy applies to all
          buyers and sellers who utilize our platform for business transactions involving goods.
        </p>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">2. Role of Kaushal Network</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              <strong>Kaushal Network</strong> acts exclusively as an intermediary, enabling
              connections between buyers, sellers, and third-party logistics providers.
            </li>
            <li>
              The platform itself does not engage in shipping, delivery, or transportation of goods;
              however, it assists users in getting products shipped through its network and
              integrated shipping and logistics platforms.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">3. Shipping Responsibilities</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              Sellers are responsible for arranging the shipping, delivery, and fulfillment of goods
              purchased via the platform.
            </li>
            <li>
              Buyers and sellers must mutually agree on shipping methods, timelines, and costs
              during their transaction negotiations.
            </li>
            <li>
              Logistics providers may be suggested or integrated for reference, but any arrangement
              or contract is directly between the transaction parties and the service provider.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">4. Shipping Methods</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              Sellers may offer various shipping options depending on the nature of the goods (Full
              Truck Load, Part Truck Load, Courier/Parcel, etc.).
            </li>
            <li>
              Buyers should communicate their shipping preferences to sellers at the time of order
              confirmation.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">5. Charges and Taxes</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              Shipping and delivery charges are determined by the seller, taking into account the
              logistics provider’s rates and the specifics of the shipment (weight, size, distance).
            </li>
            <li>
              All applicable taxes and duties (including GST) must be clearly itemized on the
              invoice provided to the buyer.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">6. Delivery Timelines</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              Delivery schedules shall be communicated and agreed upon by the buyer and seller
              before the order is finalized.
            </li>
            <li>
              The seller is responsible for providing a realistic estimated delivery timeline and
              for notifying the buyer of any changes or delays.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">
          7. Shipping Updates and Order Tracking
        </h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              When available, sellers must provide order tracking details or shipping references to
              buyers upon dispatch.
            </li>
            <li>
              Buyers are encouraged to use the provided information to monitor shipment status.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">8. Risk, Loss, and Claims</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              Risk of loss, damage during transit, or non-delivery lies with the seller and/or the
              logistics provider as per the agreed business terms.
            </li>
            <li>
              In the event of damages or loss during transit, buyers should promptly notify the
              seller and logistics provider with supporting documentation for any claims.
            </li>
            <li>
              Kaushal Network does not arbitrate shipping disputes but may facilitate communication
              between parties if issues arise.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">9. International Orders</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              For cross-border (export/import) transactions, buyers and sellers must ensure full
              compliance with relevant legal, customs, and documentation requirements.
            </li>
            <li>
              All customs duties, tariffs, or additional fees are the responsibility of the parties
              involved in the transaction.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">10. Platform Disclaimer</h3>
        <div>
          <ul className="list-disc list-inside">
            <li>
              Kaushal Network is not a party to any contract involving the shipment or delivery of
              goods between users.
            </li>
            <li>
              The platform cannot guarantee the quality, timeliness, or reliability of any shipping
              or delivery services arranged independently by users.
            </li>
            <li>
              Users are responsible for performing their own due diligence before finalizing
              shipping arrangements.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">
          11. Recommendations for Platform Users
        </h3>
        <ul className="list-disc list-inside">
          <li>Review all shipping terms before confirming a purchase.</li>
          <li>Retain documentation of all agreements, tracking details, and correspondence.</li>
          <li>
            Report any unresolved shipping issues to the platform’s grievance redressal officer.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-blue-600 mt-4">12. Contact and Escalation</h3>
        <p>
          For questions about this Shipping & Delivery Policy or for shipping-related disputes,
          users may contact:
        </p>
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
          This Shipping & Delivery Policy applies exclusively to users of Kaushal Network and is
          subject to periodic review and update.
        </p>
      </section>
    </div>
  );
};

export default Shipping;
