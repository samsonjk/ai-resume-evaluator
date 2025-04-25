"use client"

import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900 relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={100} height={40} />
          <span className="text-xl font-bold dark:text-white">AI Resume Evaluator</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 relative">
        <Link href="/" className="text-gray-700 dark:text-gray-200 hover:underline">
          <span className="cursor-pointer">Home</span>
        </Link>
        <Link href="/subscribe" className="text-gray-700 dark:text-gray-200 hover:underline">Subscription</Link>

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:underline">Dashboard</Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:underline focus:outline-none"
              >
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{session.user?.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Subscription
                  </Link>
                  <Link
                    href="/reports"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Reports
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline dark:text-blue-400"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden focus:outline-none text-gray-700 dark:text-white"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Popup */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 w-48 z-50 md:hidden">
          <Link href="/" className="block py-2 text-gray-700 dark:text-gray-200 hover:underline">Home</Link>
          <Link href="/subscribe" className="block py-2 text-gray-700 dark:text-gray-200 hover:underline">Subscription</Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block py-2 text-gray-700 dark:text-gray-200 hover:underline">Dashboard</Link>
              <Link href="/profile" className="block py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:underline">
                <User className="w-5 h-5" />
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="block py-2 text-left text-red-500 hover:underline w-full"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block py-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
