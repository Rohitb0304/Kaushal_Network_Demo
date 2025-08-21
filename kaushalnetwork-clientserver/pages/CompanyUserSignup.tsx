import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../configs/firebase';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function CompanyUserSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleAuthProvider);

      // Get Google credential and user info
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      // Check if we have all the necessary information
      if (!token || !user) {
        toast.error("Couldn't retrieve user information from Google");
        return;
      }

      // Extract user data that we need
      const userData = {
        email: user.email,
        name: user.displayName,
        profilePicture: user.photoURL,
        googleId: user.uid,
        token: token,
      };

      // Send to our backend to either create a new user or log in existing user
      try {
        // You would replace this with your actual API endpoint
        const response = await axios.post(
          ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/auth/google`,
          userData,
          {
            withCredentials: true,
          }
        );

        // Handle successful authentication
        if (response.status === 200 || response.status === 201) {
          toast.success('Successfully signed in with Google!');
          navigate('/admin-view'); // Redirect to dashboard
          window.location.reload(); // Refresh to update auth state
        }
      } catch (apiError) {
        console.error('API error during Google login:', apiError);
        toast.error('Failed to authenticate with server. Please try again.');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => location.reload());
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <button
        onClick={handleSignInWithGoogle}
        disabled={isLoading}
        className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          <>
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
              />
              <path
                fill="#34A853"
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
              />
              <path
                fill="#4A90E2"
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
              />
              <path
                fill="#FBBC05"
                d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25539 21.31 7.3104 24 12.0004 24Z"
              />
            </svg>
            <span>Sign in with Google</span>
          </>
        )}
      </button>

      <button onClick={handleSignOut} className="mt-4 text-sm text-gray-600 hover:text-gray-800">
        Sign Out
      </button>
    </div>
  );
}
