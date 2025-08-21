import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 space-y-8">
      <h1 className="text-4xl font-bold text-center text-blue-700">Contact Us – Kaushal Network</h1>
      <p className="text-lg">
        We are committed to delivering prompt, dedicated, and transparent support for all your
        queries, business needs, and partnership opportunities. Reach out through any of the
        channels below, and a member of our specialized team will assist you.
      </p>

      {/* Email Support */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">📧 Email Support</h2>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>General Queries:</strong>{' '}
            <a href="mailto:support@kaushalnetwork.in" className="text-blue-500 underline">
              support@kaushalnetwork.in
            </a>
          </li>
          <li>
            <strong>Sales & Partnerships:</strong>{' '}
            <a href="mailto:sales@kaushalnetwork.in" className="text-blue-500 underline">
              sales@kaushalnetwork.in
            </a>
          </li>
          <li>
            <strong>Advertiser Assistance:</strong>{' '}
            <a href="mailto:ads@kaushalnetwork.in" className="text-blue-500 underline">
              ads@kaushalnetwork.in
            </a>
          </li>
          <li>
            <strong>Media & PR:</strong>{' '}
            <a href="mailto:media@kaushalnetwork.in" className="text-blue-500 underline">
              media@kaushalnetwork.in
            </a>
          </li>
        </ul>
      </section>

      {/* Call Us */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">📞 Call Us</h2>
        <p>
          Our customer care is available <strong>Monday to Saturday: 9:00 AM – 7:00 PM IST</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>Customer Support:</strong> +91-7003497237
          </li>
          <li>
            <strong>Business Onboarding Helpline:</strong> +91-8446994089
          </li>
        </ul>
      </section>

      {/* Office */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">🏢 Corporate & Registered Office</h2>
        <p>
          Kaushal Network Technologies Private Limited
          <br />
          58B GC Ghosh Road
          <br />
          Kolkata - 700048
        </p>
      </section>

      {/* Chat & Quick Connect */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">💬 Chat & Quick Connect</h2>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>Live Chat:</strong> Use the chat widget on our website/mobile app for instant
            support.
          </li>
          <li>
            <strong>WhatsApp Support:</strong> Message us at +91-XXXXXXXXXX for quick query
            resolution.
          </li>
        </ul>
      </section>

      {/* Feedback */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">📮 Feedback & Suggestions</h2>
        <p>
          We value your feedback to help us improve. Please share your thoughts using our{' '}
          <span className="text-blue-500 underline">Feedback Form</span> on the platform or email us
          at{' '}
          <a href="mailto:feedback@kaushalnetwork.in" className="text-blue-500 underline">
            feedback@kaushalnetwork.in
          </a>
          .
        </p>
      </section>

      {/* Grievance */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">🚩 Grievance Redressal</h2>
        <p>
          For unresolved issues or concerns, please escalate to our Grievance Redressal Officer:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>Name:</strong> Mr. Harshal Mandhane
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:grievance@kaushalnetwork.in" className="text-blue-500 underline">
              grievance@kaushalnetwork.in
            </a>
          </li>
          <li>
            <strong>Resolution Timeline:</strong> 15 business days
          </li>
        </ul>
      </section>

      {/* Stay Connected */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">📌 Stay Connected</h2>
        <p>Follow us on:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>LinkedIn</li>
          <li>Twitter/X</li>
          <li>Facebook</li>
        </ul>
      </section>

      {/* Contact Hours */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">🕒 Contact Hours</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Contact Hours</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr>
                <td className="border border-gray-300 px-4 py-2">Customer Support</td>
                <td className="border border-gray-300 px-4 py-2">
                  9:00 AM – 7:00 PM (Mon–Sat, except public holidays)
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Corporate Inquiries</td>
                <td className="border border-gray-300 px-4 py-2">10:00 AM – 6:00 PM (Mon–Fri)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">App & Tech Support</td>
                <td className="border border-gray-300 px-4 py-2">24x7 email support</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Grievance Redressal</td>
                <td className="border border-gray-300 px-4 py-2">9:30 AM – 6:00 PM (Mon–Fri)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600">
          ❓ Frequently Asked Questions (FAQs)
        </h2>
        <p>For immediate answers, please visit our FAQ Section on the platform.</p>
      </section>

      <p className="text-center text-gray-500 mt-8 italic">
        We appreciate your interest in Kaushal Network and strive to serve you with excellence and
        professionalism. Your growth is our priority!
      </p>
    </div>
  );
};

export default ContactUs;
