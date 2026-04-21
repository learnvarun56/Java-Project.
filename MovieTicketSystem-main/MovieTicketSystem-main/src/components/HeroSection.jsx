import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedMovies } from '../services/movieService';

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getFeaturedMovies().then(setMovies);
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((c) => (c - 1 + movies.length) % movies.length);
  const next = () => setCurrent((c) => (c + 1) % movies.length);

  if (movies.length === 0) {
    return (
      <div className="h-screen bg-surface flex items-center justify-center">
        <div className="w-16 h-16 skeleton rounded-full" />
      </div>
    );
  }

  const movie = movies[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* ── Backdrop Image ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
          className="absolute inset-0"
        >
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-end pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="max-w-2xl"
            >
              {/* Genre pill */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-highest/60 backdrop-blur-sm mb-6"
              >
                <span className="text-label-sm text-secondary font-semibold">{movie.certification}</span>
                <span className="w-1 h-1 rounded-full bg-outline" />
                <span className="text-label-sm text-on-surface-variant">{movie.genre}</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-display-lg text-on-surface mb-4">
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-5 mb-6">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-secondary fill-secondary" />
                  <span className="text-label-lg text-secondary font-semibold">{movie.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Clock className="w-4 h-4" />
                  <span className="text-label-lg">{movie.duration}</span>
                </div>
                <span className="text-label-sm text-on-surface-variant">{movie.language}</span>
              </div>

              {/* Synopsis */}
              <p className="text-body-lg text-on-surface-variant mb-8 line-clamp-2">
                {movie.synopsis}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <Link to={`/booking/${movie.id}`}>
                  <motion.button
                    whileHover={{ y: -2, boxShadow: '0 0 30px 0 rgba(255, 142, 128, 0.25)' }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary-gradient flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-on-primary font-display font-bold text-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Book Tickets
                  </motion.button>
                </Link>
                <Link to={`/movies/${movie.id}`}>
                  <motion.button
                    whileHover={{ color: 'var(--color-primary)' }}
                    className="text-title-sm text-on-surface-variant hover:text-primary transition-cinematic px-4 py-3.5"
                  >
                    View Details →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Slide Controls ── */}
          <div className="absolute bottom-8 right-6 lg:right-12 flex items-center gap-3">
            <button onClick={prev} className="p-2 rounded-full bg-surface-container/60 backdrop-blur-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-cinematic">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {movies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-cinematic rounded-full ${
                    i === current
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-outline-variant hover:bg-outline'
                  }`}
                />
              ))}
            </div>

            <button onClick={next} className="p-2 rounded-full bg-surface-container/60 backdrop-blur-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-cinematic">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
