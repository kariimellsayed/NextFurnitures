"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { navLinks } from "../_constants";
import { FaBars } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { useSelector } from "react-redux";
import Loading from "./loading";

const Header = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  // Cart Length
  const totalItems = useSelector((state) => state.cart.totalItems);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Hide Navbar In This Path's
  const hideNavbar = pathName === "/sign-in" || pathName === "/sign-up";

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (hideNavbar) return null;

  return (
    <header className="w-full bg-white relative z-10 shadow-3xl">
      <div className="padding-x padding-y flex-between">
        {/* Logo */}
        <Link href="/">
          <h3 className="text-xl sm:text-3xl font-bold text-primary">
            Next
            <span className="text-gray-400 max-sm:hidden">Furnitures</span>
            <span className="text-gray-400 sm:hidden">|F</span>
          </h3>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden tap:block ml-10">
            <ul className="flex items-center tap:gap-6 gap-3 text-sm">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  {pathName === link.href ? (
                    <Link href={link.href} className="text-gray-500">
                      {link.title}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[16px] font-semibold duration-200 hover:text-gray-500"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-7 ml-auto">
            {loading ? (
              <Loading />
            ) : isSignedIn ? (
              <div className="flex items-center gap-3">
                {/* Avatar and Name */}
                <div className="flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm font-bold">
                    {user?.fullName || user?.firstName}
                  </span>
                  <Link
                    href={"/cart"}
                    className={
                      pathName === "/cart"
                        ? "bg-gray-200 w-8 h-8 flex-center relative text-primary border border-primary rounded-full z-10"
                        : "bg-primary w-8 h-8 flex-center relative text-white rounded-full z-10 "
                    }
                  >
                    <BsCart4 />
                    <span
                      className="absolute bg-red-500 text-white font-bold text-xs rounded-full
                    flex-center w-5 h-5 top-[-10px] right-[-10px] z-[-1]"
                    >
                      {totalItems}
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                {/* Login Button */}
                <Link
                  href="/sign-in"
                  className="sm:px-7 px-5 py-2 sm:text-sm text-[10px] font-semibold rounded-full bg-primary text-center text-white"
                >
                  Login
                </Link>

                {/* Register Button */}
                <Link
                  href="/sign-up"
                  className="sm:px-7 px-5 py-2 sm:text-sm text-[10px] font-semibold rounded-full bg-gray-400 text-center text-white"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="block rounded bg-primary p-2 text-white duration-200 hover:bg-slate-200 hover:text-primary tap:hidden"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Side Left Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-500 p-6 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          <IoIosCloseCircle />
        </button>
        <ul className="flex flex-col gap-4 mt-10">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              {pathName === link.href ? (
                <Link
                  href={link.href}
                  className="font-bold text-white text-[16px]"
                  onClick={toggleMenu}
                >
                  {link.title}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-[16px] font-semibold text-primary duration-20 hover:text-white"
                  onClick={toggleMenu}
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
