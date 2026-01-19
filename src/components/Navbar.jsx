import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-900 text-white">
      {/* Main Navigation */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          amazon
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 rounded-l text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-r font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {user ? (
            <>
              <div className="text-right">
                <div className="text-xs text-gray-300">Hello, {user.name}</div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold hover:text-yellow-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
              <Link
                to="/orders"
                className="hover:text-yellow-400 transition-colors"
              >
                Returns & Orders
              </Link>
              <Link
                to="/cart"
                className="relative hover:text-yellow-400 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                  <span className="font-semibold">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-400 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {showMobileMenu ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="md:hidden px-4 pb-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </form>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-700">
          <div className="px-4 py-2 space-y-2 text-sm">
            {user ? (
              <>
                <div className="text-gray-300">Hello, {user.name}</div>
                <Link
                  to="/orders"
                  className="block py-2 hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Returns & Orders
                </Link>
                <Link
                  to="/cart"
                  className="block py-2 hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="block py-2 hover:text-yellow-400 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 hover:text-yellow-400 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
