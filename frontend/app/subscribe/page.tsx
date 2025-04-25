"use client";

import { motion } from "framer-motion";
import { DollarSign, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    title: "Starter",
    price: "$1.99",
    resumes: "1 Resume",
    features: ["AI Review", "Downloadable PDF", "Tips for Improvement"],
    link: "/subscribe/starter",
    icon: <FileText className="w-10 h-10 text-blue-600" />,
  },
  {
    title: "Pro",
    price: "$14.99",
    resumes: "10 Resumes",
    features: ["Everything in Starter", "Priority Review", "Detailed Scoring"],
    link: "/subscribe/pro",
    icon: <DollarSign className="w-10 h-10 text-purple-600" />,
  },
  {
    title: "Enterprise",
    price: "$99",
    resumes: "100 Resumes",
    features: ["Everything in Pro", "Dedicated Support", "Advanced Reports"],
    link: "/subscribe/enterprise",
    icon: <CheckCircle className="w-10 h-10 text-green-600" />,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Choose Your Plan</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
        Get AI-powered resume reviews with insights and recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-lg border dark:border-gray-700 p-6 bg-white dark:bg-gray-800 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center gap-3">
              {plan.icon}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{plan.title}</h2>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{plan.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{plan.resumes}</p>
              <ul className="mt-4 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.link}
              className="mt-6 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
