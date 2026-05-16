import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-gradient-to-r from-orange-50 to-red-50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍔</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium">
              Home
            </a>
            
            {/* Dropdown Menu */}
            <div className="relative group">
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                Explore
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600">Restaurants</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600">Cuisines</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600">Offers</a>
              </div>
            </div>

            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium">
              Contact
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <button className="relative p-2 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors duration-200 group">
              <ShoppingCart size={20} className="group-hover:text-orange-600 transition-colors" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-200 font-medium group">
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="relative p-2 text-gray-700">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-orange-200">
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors">
              Home
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors">
              Explore
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors">
              About
            </a>
            <a href="#" className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors">
              Contact
            </a>
            <button className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2">
              <User size={18} />
              Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}