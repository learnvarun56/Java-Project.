import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../services/movieService';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Now Showing Section ── */}
      <section className="relative bg-surface-container-low py-20 lg:py-28">
        {/* Tonal transition gradient from hero */}
        <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-surface to-surface-container-low" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-title-sm text-primary">Trending</span>
              </div>
              <h2 className="text-display-md text-on-surface">Now Showing</h2>
            </div>
            <Link
              to="/movies"
              className="hidden md:flex items-center gap-2 text-title-sm text-on-surface-variant hover:text-primary transition-cinematic group"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-cinematic" />
            </Link>
          </motion.div>

          {/* Movie grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[2/3] skeleton rounded-lg" />
                  <div className="h-4 w-3/4 skeleton" />
                  <div className="h-3 w-1/2 skeleton" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8">
              {movies.slice(0, 4).map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          )}

          {/* Mobile "View All" */}
          <div className="md:hidden mt-8 text-center">
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 text-title-sm text-primary"
            >
              View All Movies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Experience Section ── */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-title-sm text-secondary">Premium Experience</span>
            </div>
            <h2 className="text-display-md text-on-surface mb-4">
              Why Choose ThePremiere
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Every visit is crafted to feel like an exclusive premiere night.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'IMAX & Dolby Atmos',
                description: 'Experience cinema in breathtaking clarity with cutting-edge projection and immersive surround sound.',
                gradient: 'from-primary/10 to-transparent',
              },
              {
                title: 'VIP Luxury Seating',
                description: 'Premium leather recliners with in-seat dining and a personal attendant for an exclusive experience.',
                gradient: 'from-secondary/10 to-transparent',
              },
              {
                title: 'Instant Booking',
                description: 'Select your seats in real-time, pay securely, and receive your e-ticket instantly on your device.',
                gradient: 'from-primary/5 to-transparent',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.2, 0, 0, 1] }}
                className="group p-8 rounded-xl bg-surface-container-highest/50 hover:bg-surface-container-highest transition-cinematic"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} mb-6 flex items-center justify-center`}>
                  <span className="text-headline-sm">
                    {i === 0 ? '🎬' : i === 1 ? '👑' : '⚡'}
                  </span>
                </div>
                <h3 className="text-headline-sm text-on-surface mb-3">{feature.title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon Strip ── */}
      {!loading && movies.length > 4 && (
        <section className="bg-surface-container-low py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="mb-12"
            >
              <span className="text-title-sm text-on-surface-variant">Don't Miss</span>
              <h2 className="text-display-md text-on-surface mt-2">Coming Soon</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8">
              {movies.slice(4).map((movie, i) => (
                <MovieCard key={movie.id} movie={movie} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
