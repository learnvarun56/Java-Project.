import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Play, ArrowLeft, Users } from 'lucide-react';
import { getMovieById } from '../services/movieService';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieById(id)
      .then(setMovie)
      .catch(() => setMovie(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-surface pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="aspect-[2/3] skeleton rounded-xl" />
            <div className="lg:col-span-2 space-y-4">
              <div className="h-10 w-3/4 skeleton" />
              <div className="h-4 w-1/2 skeleton" />
              <div className="h-24 w-full skeleton" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-headline-lg text-on-surface mb-3">Movie Not Found</h2>
          <Link to="/movies" className="text-title-sm text-primary">
            ← Back to Movies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* ── Backdrop ── */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/80 to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-6 lg:left-12 z-10">
          <Link
            to="/movies"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-cinematic"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-label-lg">Back</span>
          </Link>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-48 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          >
            <div className="rounded-xl overflow-hidden shadow-[0_20px_60px_0_rgba(0,0,0,0.5)]">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-2 pt-4 lg:pt-12"
          >
            {/* Genre pill */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-label-sm font-semibold">
                {movie.certification}
              </span>
              <span className="text-label-lg text-on-surface-variant">{movie.genre}</span>
            </div>

            {/* Title */}
            <h1 className="text-display-lg text-on-surface mb-6">{movie.title}</h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-display text-xl font-bold text-secondary">{movie.rating}</span>
                <span className="text-label-sm text-on-surface-variant">/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Clock className="w-4 h-4" />
                <span className="text-label-lg">{movie.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Calendar className="w-4 h-4" />
                <span className="text-label-lg">{movie.releaseDate}</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-8">
              <h3 className="text-title-sm text-on-surface-variant mb-3">Synopsis</h3>
              <p className="text-body-lg text-on-surface leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Director & Cast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div>
                <h4 className="text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">Director</h4>
                <p className="text-title-lg text-on-surface">{movie.director}</p>
              </div>
              <div>
                <h4 className="text-label-sm text-on-surface-variant mb-2 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Cast
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span
                      key={actor}
                      className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link to={`/booking/${movie.id}`}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 0 40px 0 rgba(255, 142, 128, 0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary-gradient flex items-center gap-2.5 px-10 py-4 rounded-lg text-on-primary font-display font-bold"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Book Tickets
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-20" />
    </main>
  );
}
