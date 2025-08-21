import { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "1. What is The Kaushal Network and who is it for?",
      answer: "The Kaushal Network is a digital ecosystem designed to transform how Indian businesses connect, operate, and grow. It caters to suppliers, manufacturers, traders, retailers, service providers, institutions, and customers—enabling seamless B2B and B2C collaboration.",
    },
    {
      question: "2. How does The Kaushal Network help my business grow?",
      answer: "By offering an end-to-end platform for procurement, sales, customer service, and business expansion, Kaushal Network removes barriers and opens up new markets—both domestically and globally. It helps businesses build strong networks and reach the right partners and customers.",
    },
    {
      question: "3. Is The Kaushal Network suitable for small businesses or MSMEs?",
      answer: "Absolutely. We are committed to democratizing access to digital infrastructure. The platform offers enterprise-level tools—like order management, payment systems, and analytics—at MSME-friendly pricing, so businesses of all sizes can thrive.",
    },
    {
      question: "4. I would like to get started with e-commerce. Could you please guide me on where to begin?",
      answer: "You can find the last tab in your dashboard labeled ‘E-commerce.’ Kindly fill out the form there, and our team will get in touch with you shortly.",
    },
    {
      question: "5. How is The Kaushal Network different from other marketplaces?",
      answer: "Unlike traditional marketplaces that only connect buyers and sellers, The Kaushal Network is a comprehensive ecosystem. It focuses on long-term growth through smart operations, strategic networking, and access to tools that support everyday excellence and global reach.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 space-y-4">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        Frequently Asked Questions (FAQs)
      </h1>
      <p className="text-lg text-center text-gray-600">
        Find quick answers to common questions about the Kaushal Network, our services,
        and how we can help your business grow.
      </p>

      <div className="space-y-4 mt-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg bg-white rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="text-blue-800">{faq.question}</span>
              <span
                className={`transform transition-transform duration-300 ease-in-out text-blue-500 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 border-t border-gray-200 text-gray-700 bg-gray-50">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 mt-8 italic">
        Still have questions? Feel free to <a href="/contact-us" className="text-blue-500 underline">contact us</a> directly for more information.
      </p>
    </div>
  );
};

export default FAQs;
