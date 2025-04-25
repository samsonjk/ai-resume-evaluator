'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Toaster, toast } from 'react-hot-toast';
import { Bars3Icon } from '@heroicons/react/24/outline';

const features = [
  { name: 'Resume Analyzer', href: '/features/analyze-resume' },
  { name: 'Resume Optimization', href: '/features/resume-optimization' },
  { name: 'Job Description Matching', href: '/features/jd-match' },
  { name: 'Cover Letter Creation', href: '/features/cover-letter' },
  { name: 'Interview Questions', href: '/features/interview-questions' },
  { name: 'Salary Negotiation Strategy', href: '/features/salary-negotiation' },
  { name: 'Networking Outreach Messages', href: '/features/networking-messages' },
  { name: 'Personal Branding Strategy', href: '/features/personal-branding' },
  { name: 'LinkedIn URL Parser', href: '/features/linkedin-parser' },
  /* { name: 'Mock Interview', href: '/features/mock-interview' }, */
  /* { name: 'Career Change Guidance', href: '/features/career-guidance' }, */
  /* { name: 'Elevator Pitch Creation', href: '/features/elevator-pitch' }, */
  /* { name: 'Past Reports Viewer', href: '/features/past-reports' }, */
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = (name: string, href: string) => {
    setSelectedFeature(name);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${name} launched successfully!`);
      window.location.href = href;
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <nav className="flex justify-between items-center mb-8 px-4">
        <div className="text-2xl font-bold text-blue-600 dark:text-white">AI Resume Pro</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="sm:hidden text-gray-600 dark:text-white">
          <Bars3Icon className="h-6 w-6" />
        </button>
      </nav>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="sm:hidden mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(feature.name, feature.href)}
              className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              {feature.name}
            </div>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(feature.name, feature.href)}
            className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{feature.name}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click to explore</p>
          </motion.div>
        ))}
      </div>

      <Dialog open={isLoading} onClose={() => setIsLoading(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="relative z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80 text-center">
          <p className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Loading...</p>
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Launching <span className="font-semibold">{selectedFeature}</span>
          </p>
        </div>
      </Dialog>

      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
}
