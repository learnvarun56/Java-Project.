import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Search, Menu, X, Ticket } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Now Showing' },
    { to: '/coming-soon', label: 'Coming Soon' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            >
              <Film className="w-8 h-8 text-primary" />
            </motion.div>
            <span className="font-display text-xl font-bold tracking-tight text-on-surface">
              THE<span className="text-primary">PREMIERE</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-label-lg font-label relative py-1 transition-cinematic ${
                  isActive(link.to)
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* ── Actions ── */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-cinematic"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <Link to="/movies">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary-gradient flex items-center gap-2 px-5 py-2.5 rounded-lg text-on-primary font-display font-semibold text-sm"
              >
                <Ticket className="w-4 h-4" />
                Book Now
              </motion.button>
            </Link>
          </div>

          {/* ── Mobile Menu Toggle ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Search Bar Dropdown ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-4">
              <input
                type="text"
                placeholder="Search movies, cinemas..."
                autoFocus
                className="w-full bg-surface-container-high text-on-surface placeholder:text-on-surface-variant px-5 py-3 rounded-lg font-sans text-sm focus:outline-none focus:bg-surface-bright focus:ring-1 focus:ring-primary/40 transition-cinematic"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            className="md:hidden overflow-hidden bg-surface-container-low"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block text-title-lg py-2 ${
                    isActive(link.to) ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/movies" onClick={() => setIsOpen(false)}>
                <button className="w-full btn-primary-gradient flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-on-primary font-display font-semibold text-sm mt-4">
                  <Ticket className="w-4 h-4" />
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
