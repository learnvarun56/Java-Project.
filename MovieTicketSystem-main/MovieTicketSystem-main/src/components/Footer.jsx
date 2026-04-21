import { Film, Globe, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <Film className="w-7 h-7 text-primary" />
              <span className="font-display text-lg font-bold text-on-surface">
                THE<span className="text-primary">PREMIERE</span>
              </span>
            </Link>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              The ultimate cinematic experience. Book your next movie in style with premium seats and immersive sound.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-title-sm text-on-surface mb-5">Explore</h4>
            <ul className="space-y-3">
              {['Now Showing', 'Coming Soon', 'Cinemas', 'Offers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-body-md text-on-surface-variant hover:text-primary transition-cinematic">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div>
            <h4 className="text-title-sm text-on-surface mb-5">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-body-md text-on-surface-variant hover:text-primary transition-cinematic">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Social ── */}
          <div>
            <h4 className="text-title-sm text-on-surface mb-5">Connect</h4>
            <div className="flex gap-3">
              {[MessageCircle, Heart, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-cinematic"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="mt-14 pt-8 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent h-px" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-label-sm text-on-surface-variant">
            © {new Date().getFullYear()} ThePremiere. All rights reserved.
          </p>
          <p className="text-label-sm text-outline">
            Crafted with the Cinematic Editorial Design System
          </p>
        </div>
      </div>
    </footer>
  );
}
