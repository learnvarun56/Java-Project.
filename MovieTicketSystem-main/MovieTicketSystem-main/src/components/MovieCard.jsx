import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

export default function MovieCard({ movie, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={`/movies/${movie.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-surface-container-lowest transition-cinematic group-hover:shadow-[0_20px_40px_0_rgba(255,142,128,0.06)]">
          {/* ── Poster ── */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <motion.img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            />
            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-container-lowest to-transparent" />

            {/* Rating badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container/80 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-label-sm text-secondary font-semibold">{movie.rating}</span>
            </div>

            {/* Certification */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-surface-container/80 backdrop-blur-sm">
              <span className="text-label-sm text-on-surface-variant font-medium">{movie.certification}</span>
            </div>
          </div>

          {/* ── Info */}
          <div className="p-4 space-y-2">
            <h3 className="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-cinematic line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-label-sm text-on-surface-variant">{movie.genre}</p>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-label-sm">{movie.duration}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
