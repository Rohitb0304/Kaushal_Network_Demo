import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

// Define the shape of the form data
interface FormData {
  ecommerceName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string; // Added a password field for registration
}

// Define the shape of the payment data
interface PaymentData {
  id: string;
  fullName: string;
  ecommerceName: string;
  email: string;
  phoneNumber: string;
  razorpayPaymentId: string;
  isPaid: boolean;
  createdAt: string;
}

const Ecommerce: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    ecommerceName: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  // State to manage the active view: 'register' or 'payments'
  const [activeView, setActiveView] = useState<'register' | 'payments'>('register');

  // State to track if the Razorpay script has been loaded
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<PaymentData[]>([]);

  // Load the Razorpay script dynamically when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      setRazorpayLoaded(true);
      console.log('Razorpay script loaded successfully.');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch payment data when the view switches to 'payments'
  useEffect(() => {
    if (activeView === 'payments') {
      const fetchPayments = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v0/ecommerce/payments`);
          setPayments(response.data.payments);
        } catch (error) {
          toast.error('Failed to fetch payments.');
          console.error('Error fetching payments:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPayments();
    }
  }, [activeView]);

  // Handle input changes and update the state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission and trigger Razorpay payment
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!razorpayLoaded) {
      toast.error('Razorpay script not yet loaded.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Register the user with the backend
      const registrationResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v0/ecommerce/register`, formData);
      toast.success(registrationResponse.data.message);

      // Step 2: Proceed with Razorpay payment only after successful registration
      const options = {
        key: 'rzp_test_R7UHWtujZYlte8', // Replace with your actual key ID
        amount: 250000, // Amount in paise (2500 INR = 250000 paise)
        currency: 'INR',
        name: formData.ecommerceName || 'E-commerce Setup',
        description: 'Payment for E-commerce Setup',
        handler: async function (response: any) {
          // This function is called when the payment is successful
          try {
            // Step 3: Call the new backend endpoint to update payment status
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v0/ecommerce/payment-success`, {
              email: formData.email,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            toast.success('Payment successful! Your order has been placed.');
            // After successful payment, switch to the payments view to show the new transaction
            setActiveView('payments');
          } catch (error) {
            toast.error('Failed to update payment status on the server.');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNumber,
        },
        theme: {
          color: '#4F46E5', // Indigo-600 color for the payment modal
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* View Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`py-2 px-6 rounded-full font-medium transition-colors ${
            activeView === 'register' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveView('register')}
        >
          Register New Company
        </button>
        <button
          className={`py-2 px-6 rounded-full font-medium transition-colors ${
            activeView === 'payments' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveView('payments')}
        >
          View Payments
        </button>
      </div>

      {activeView === 'register' ? (
        <>
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">New E-commerce Setup</h1>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="ecommerceName" className="block text-sm font-medium text-gray-700">
                Name for your e-commerce
              </label>
              <input
                type="text"
                id="ecommerceName"
                name="ecommerceName"
                value={formData.ecommerceName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., My Awesome Store"
                required
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone No
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., +1 (555) 123-4567"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a secure password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1 p-3 bg-blue-50 rounded-md font-semibold text-lg text-blue-800 border border-blue-200">
                ₹ 2499
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </motion.button>
          </form>
        </>
      ) : (
        <>
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Payment Transactions</h1>
          </motion.div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="animate-spin mx-auto h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2">Loading transactions...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">No paid transactions found</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no e-commerce payments to display.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-commerce Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.fullName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.ecommerceName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.razorpayPaymentId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">₹ 2,499</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {payment.isPaid ? 'Paid' : 'Pending'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Ecommerce;
