"use client";

import Link from "next/link";

import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import ConfirmationPopup from "@/components/ConfirmationPopup";

const Navbar = () => {
  const dropdownRef = useRef(null);

  const userContext = useContext(UserContext);
  const { logout } = useAuth(userContext);
  const { user } = userContext;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleLogoutConfirm = () => {
    setIsConfirmationOpen(false); // Close the popup
    logout(); // Perform the logout
  };

  const handleLogoutCancel = () => {
    setIsConfirmationOpen(false); // Close the popup
  };

  useEffect(() => {
    // Only attempt to set names if user data is available
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]); // Dependency on 'user' to update names when it changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if click is outside the dropdown or its parent element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Dependency array is empty to run only once when component mounts

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <nav className="bg-cyan-900 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <Link href="/">AssuExpert</Link>
          </div>
          {user ? (
            <div
              className="relative w-40 flex justify-center"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={handleDropdownClick}
                className="text-white relative z-10" // Add relative positioning and z-index to button
              >
                {firstName + " " + lastName}
              </button>
              {isDropdownOpen && ( // Conditionally render dropdown menu
                <div className="absolute bg-white rounded-md shadow-md mt-10 w-40 z-20">
                  <button
                    className="w-full"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      className="block px-4 py-2 w-full hover:bg-gray-100 rounded-md"
                      href="/expert/profile"
                    >
                      My Profile
                    </Link>
                  </button>
                  <button
                    className="block px-4 py-2 w-full hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      setIsConfirmationOpen(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
              {isConfirmationOpen && (
                <ConfirmationPopup
                  message="Are you sure you want to log out?"
                  onConfirm={handleLogoutConfirm}
                  onCancel={handleLogoutCancel}
                />
              )}
            </div>
          ) : (
            <button type="button">
              <Link
                href="/auth"
                className="bg-white px-5 py-2 rounded-3xl font-extrabold"
              >
                LOGIN
              </Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
