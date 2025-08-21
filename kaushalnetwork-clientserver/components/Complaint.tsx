import React from 'react';

const Complaint = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-serif leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">Kaushal Network – Complaint Registration</h1>
      <p className="mb-6">
        We value your experience and aim to resolve your complaints promptly. Please use the
        following form to register your concern with Kaushal Network Technologies Pvt. Ltd. Our team
        will contact you with a suitable resolution at the earliest.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Contact Information</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Full Name:</li>
        <li>Company Name (if applicable):</li>
        <li>Email Address:</li>
        <li>Phone Number:</li>
        <li>Preferred Contact Method: Email &nbsp;&nbsp; Phone</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">2. Complaint Category</h2>
      <p className="mb-2">(Select the most relevant option)</p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Account or Membership</li>
        <li>Paid Services or Subscription</li>
        <li>Seller/Buyer Policy Compliance</li>
        <li>Product or Service Misrepresentation</li>
        <li>Non-Delivery or Defective Product</li>
        <li>Payment Issues</li>
        <li>Fees and Charges</li>
        <li>Technical Problems (Website or App)</li>
        <li>Feedback</li>
        <li>Others (please specify):</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">3. Transaction Details (if applicable)</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Order/Reference Number:</li>
        <li>Seller/Buyer Name:</li>
        <li>Seller/Buyer Contact Details:</li>
        <li>Date of Transaction:</li>
        <li>Product or Service Name/Category:</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Description of the Complaint</h2>
      <p className="mb-2">
        Please provide detailed information about your issue. Include any relevant facts, such as
        communication history, attempted resolutions, or agreements.
      </p>
      <p className="mb-6">Describe your problem (max 1000 characters):</p>

      <h2 className="text-xl font-semibold mb-2">5. Supporting Documents/Attachments</h2>
      <p className="mb-2">
        You may upload or attach relevant documents to support your complaint (optional).
      </p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Payment receipt or invoice</li>
        <li>Email or message screenshots</li>
        <li>Product photos</li>
        <li>Contract or agreement snippets</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">6. Preferred Resolution</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Refund</li>
        <li>Replacement</li>
        <li>Cancellation</li>
        <li>Technical support</li>
        <li>Other (please specify):</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">7. Declaration & Disclaimer</h2>
      <p className="mb-6">
        By submitting this complaint, I affirm that the information provided is accurate to the best
        of my knowledge. I understand that Kaushal Network acts as an intermediary platform and is
        not a party to business transactions between users. The company will facilitate
        communication and support but does not guarantee resolution outcomes beyond its platform
        scope.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Submission</h2>
      <p className="mb-6">[Submit] &nbsp;&nbsp;&nbsp; [Reset]</p>

      <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
      <p>Email: support@kaushalnetwork.in</p>
      <p>Customer Care: +91-7003497237</p>
      <p>Grievance Redressal Officer: grievance@kaushalnetwork.in</p>
      <p className="italic mt-4">
        Upon submission, you will receive a ticket/reference number to track your complaint’s
        status. Our team strives to assist you promptly and professionally.
      </p>
    </div>
  );
};

export default Complaint;
