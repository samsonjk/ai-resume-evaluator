'use client';

import React, { Suspense } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

const LoginPage = () => {

  const handleLinkedInLogin = () => {
    alert('LinkedIn Login Clicked');
    // TODO: Integrate LinkedIn OAuth
  };

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-3/4 bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            AI Resume Evaluator
          </h1>
          <p className="text-lg text-gray-600">
            Get instant feedback on your resume and match with your dream job.
          </p>
          <Image
            src="/title-image.webp" // Replace with your image path
            alt="Resume Illustration"
            width={800} // Adjust as needed
            height={320} // Adjust as needed
            className="w-3/4 mx-auto max-h-80 object-contain"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Sign in to Continue
          </h2>

          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="flex items-center justify-center border rounded-xl py-3 w-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <FcGoogle className="mr-2 text-xl" />
            Continue with Google
          </button>

          <button
            onClick={handleLinkedInLogin}
            className="flex items-center justify-center border rounded-xl py-3 w-full text-sm font-medium text-blue-800 hover:bg-blue-50 transition"
          >
            <FaLinkedin className="mr-2 text-xl" />
            Continue with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

// Wrap the LoginPage with Suspense to handle CSR correctly
const SuspendedLoginPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginPage />
  </Suspense>
);

export default SuspendedLoginPage;
