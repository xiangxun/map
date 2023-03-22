/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import Link from "next/link";

const Navbar=()=> {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              MAP
            </Link>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-10">
                {[
                  ["1", "产业园区", "/upload"],
                  ["2", "城市", "/city"],
                ].map(([id, title, url]) => (
                  <Link
                    key={id}
                    href={url}
                    className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-slate-100 hover:text-slate-900"
                  >
                    {title}
                  </Link>
                ))}
                {/* <Link
                  href="/park"
                  className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-800"
                >
                  产业园区
                </Link>
                <Link
                  href="/city"
                  className="px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-800"
                >
                  城市
                </Link> */}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              <Link
                href="/about"
                className="ml-3 text-gray-600 hover:text-gray-800"
              >
                about
              </Link>
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center p-2 text-gray-800 transition duration-150 ease-in-out bg-gray-200 rounded-md hover:text-gray-900 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:text-gray-900"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
        {showMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 sm:px-3">
              {[
                ["1", "产业园区", "/upload"],
                ["2", "城市", "/city"],
              ].map(([id, title, url]) => (
                <Link
                  key={id}
                  href={url}
                  className="block px-3 py-2 text-base text-gray-600 rounded-md hover:bg-slate-100 hover:text-slate-900"
                >
                  {title}
                </Link>
              ))}
              {/* <Link
                href="/park"
                className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-800"
              >
                产业园区
              </Link>
              <Link
                href="/city"
                className="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:text-gray-800"
              >
                城市
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
