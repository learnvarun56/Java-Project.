import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { getMovies, searchMovies } from '../services/movieService';

const GENRES = ['All', 'Sci-Fi', 'Action', 'Drama', 'Horror', 'Mystery', 'Fantasy'];

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = movies;
    if (activeGenre !== 'All') {
      result = result.filter((m) => m.genre.toLowerCase().includes(activeGenre.toLowerCase()));
    }
    if (query.trim()) {
      result = result.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFiltered(result);
  }, [query, activeGenre, movies]);

  return (
    <main className="min-h-screen bg-surface pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="mb-12"
        >
          <h1 className="text-display-md text-on-surface mb-3">Now Showing</h1>
          <p className="text-body-lg text-on-surface-variant">
            Discover the latest blockbusters and indie gems on the big screen.
          </p>
        </motion.div>

        {/* ── Search & Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
          className="mb-10 space-y-6"
        >
          {/* Search bar */}
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title..."
              className="w-full bg-surface-container-high text-on-surface placeholder:text-on-surface-variant pl-12 pr-5 py-3.5 rounded-lg font-sans text-sm focus:outline-none focus:bg-surface-bright transition-cinematic"
            />
          </div>

          {/* Genre chips */}
          <div className="flex flex-wrap gap-2.5">
            {GENRES.map((genre) => (
              <motion.button
                key={genre}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGenre(genre)}
                className={`px-4 py-2 rounded-full text-label-lg font-medium transition-cinematic ${
                  activeGenre === genre
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                }`}
              >
                {genre}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Movie Grid ── */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[2/3] skeleton rounded-lg" />
                <div className="h-4 w-3/4 skeleton" />
                <div className="h-3 w-1/2 skeleton" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-headline-sm text-on-surface-variant mb-2">No movies found</p>
            <p className="text-body-md text-outline">Try adjusting your search or filters.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8">
            {filtered.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
