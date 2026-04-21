import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Clock, Check, Ticket, Star } from 'lucide-react';
import { getMovieById } from '../services/movieService';
import { getCinemas, getShowtimes, getSeatLayout, createBooking } from '../services/bookingService';
import SeatSelector from '../components/SeatSelector';

const STEPS = ['Select Cinema', 'Select Showtime', 'Select Seats', 'Confirm'];

export default function Booking() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selections
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);

  // Load movie + cinemas
  useEffect(() => {
    Promise.all([getMovieById(movieId), getCinemas(movieId)])
      .then(([m, c]) => {
        setMovie(m);
        setCinemas(c);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  // Load showtimes when cinema selected
  useEffect(() => {
    if (!selectedCinema) return;
    getShowtimes(movieId, selectedCinema.id).then(setShowtimes);
  }, [selectedCinema, movieId]);

  // Load seats when showtime selected
  useEffect(() => {
    if (!selectedShowtime) return;
    getSeatLayout(selectedShowtime.id).then(setSeatLayout);
  }, [selectedShowtime]);

  const canProceed = () => {
    if (step === 0) return !!selectedCinema;
    if (step === 1) return !!selectedShowtime;
    if (step === 2) return selectedSeats.length > 0;
    return false;
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleConfirm = async () => {
    const result = await createBooking({
      movieId: movie.id,
      cinemaId: selectedCinema.id,
      showtimeId: selectedShowtime.id,
      seats: selectedSeats.map((s) => s.id),
      totalPrice: selectedSeats.reduce((sum, s) => sum + s.price, 0),
    });
    setBookingResult(result);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-surface pt-36">
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
          <div className="h-8 w-64 skeleton" />
          <div className="h-4 w-48 skeleton" />
          <div className="space-y-4 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 skeleton rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-headline-sm text-on-surface-variant">Movie not found.</p>
      </main>
    );
  }

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <main className="min-h-screen bg-surface pt-36 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* ── Booking Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-cinematic mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-label-lg">Back</span>
          </button>
          <h1 className="text-headline-lg text-on-surface">
            Book — <span className="text-primary">{movie.title}</span>
          </h1>
        </motion.div>

        {/* ── Step Indicator ── */}
        <div className="flex items-center gap-1 sm:gap-2 mb-12 p-4 rounded-xl bg-surface-container-low/50">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-label-sm font-bold transition-cinematic ${
                  i < step
                    ? 'bg-primary text-on-primary'
                    : i === step
                    ? 'bg-primary/20 text-primary ring-2 ring-primary/40'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`hidden sm:block text-label-sm transition-cinematic ${
                  i <= step ? 'text-on-surface' : 'text-on-surface-variant'
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px transition-cinematic ${
                    i < step ? 'bg-primary' : 'bg-outline-variant/30'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Step Content ── */}
        <AnimatePresence mode="wait">
          {/* STEP 0: Select Cinema */}
          {step === 0 && (
            <motion.div
              key="cinema"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              className="space-y-5"
            >
              <h2 className="text-headline-sm text-on-surface mb-6">Choose your cinema</h2>
              {cinemas.map((cinema) => (
                <motion.button
                  key={cinema.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCinema(cinema)}
                  className={`w-full text-left p-6 rounded-xl transition-cinematic ${
                    selectedCinema?.id === cinema.id
                      ? 'bg-primary/10 ring-1 ring-primary/30'
                      : 'bg-surface-container-highest/50 hover:bg-surface-container-highest'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-title-lg text-on-surface mb-1">{cinema.name}</h3>
                      <div className="flex items-center gap-1.5 text-on-surface-variant mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-body-md">{cinema.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cinema.facilities.map((f) => (
                          <span
                            key={f}
                            className="px-2.5 py-1 rounded-full bg-surface-container text-label-sm text-on-surface-variant"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-label-lg text-secondary font-semibold">{cinema.rating}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* STEP 1: Select Showtime */}
          {step === 1 && (
            <motion.div
              key="showtime"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            >
              <h2 className="text-headline-sm text-on-surface mb-2">Choose a showtime</h2>
              <p className="text-body-md text-on-surface-variant mb-8">
                at {selectedCinema?.name}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {showtimes.map((st) => (
                  <motion.button
                    key={st.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedShowtime(st)}
                    className={`p-5 rounded-xl text-center transition-cinematic ${
                      selectedShowtime?.id === st.id
                        ? 'bg-primary/10 ring-1 ring-primary/30'
                        : 'bg-surface-container-highest/50 hover:bg-surface-container-highest'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <Clock className="w-4 h-4 text-on-surface-variant" />
                      <span className="font-display text-lg font-bold text-on-surface">{st.time}</span>
                    </div>
                    <p className="text-label-sm text-on-surface-variant mb-1">{st.format}</p>
                    <p className="text-label-lg text-secondary font-semibold">${st.price.toFixed(2)}</p>
                    <p className="text-label-sm text-outline mt-1">{st.seatsAvailable} seats left</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Select Seats */}
          {step === 2 && (
            <motion.div
              key="seats"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
            >
              <h2 className="text-headline-sm text-on-surface mb-2">Select your seats</h2>
              <p className="text-body-md text-on-surface-variant mb-10">
                {selectedShowtime?.time} • {selectedShowtime?.format}
              </p>
              <SeatSelector
                layout={seatLayout}
                onSelectionChange={setSelectedSeats}
              />
            </motion.div>
          )}

          {/* STEP 3: Confirm */}
          {step === 3 && !bookingResult && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              className="max-w-lg mx-auto"
            >
              <h2 className="text-headline-sm text-on-surface mb-8 text-center">Confirm Booking</h2>

              <div className="rounded-xl bg-surface-container-highest/50 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-on-surface">{movie.title}</h3>
                    <p className="text-label-sm text-on-surface-variant">{movie.genre}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Cinema', value: selectedCinema?.name },
                    { label: 'Showtime', value: `${selectedShowtime?.time} — ${selectedShowtime?.format}` },
                    { label: 'Seats', value: selectedSeats.map((s) => s.id).join(', ') },
                    { label: 'Tickets', value: `${selectedSeats.length}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</span>
                      <span className="text-body-md text-on-surface font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 bg-gradient-to-r from-transparent via-outline-variant/20 to-transparent h-px" />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-title-sm text-on-surface">Total</span>
                  <span className="text-headline-lg text-secondary font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 0 40px 0 rgba(255, 142, 128, 0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirm}
                  className="w-full btn-primary-gradient flex items-center justify-center gap-2.5 py-4 rounded-lg text-on-primary font-display font-bold"
                >
                  <Ticket className="w-5 h-5" />
                  Confirm & Pay
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Booking Success */}
          {bookingResult && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-primary" />
              </motion.div>
              <h2 className="text-display-md text-on-surface mb-3">Booking Confirmed!</h2>
              <p className="text-body-lg text-on-surface-variant mb-2">
                Your tickets for <span className="text-on-surface font-semibold">{movie.title}</span> are ready.
              </p>
              <p className="text-label-lg text-secondary font-semibold mb-8">
                Booking ID: {bookingResult.id}
              </p>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="btn-primary-gradient px-8 py-3.5 rounded-lg text-on-primary font-display font-bold"
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Navigation Buttons ── */}
        {!bookingResult && step < 3 && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-outline-variant/10">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-title-sm transition-cinematic ${
                step === 0
                  ? 'text-outline cursor-not-allowed'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <motion.button
              whileHover={canProceed() ? { y: -2 } : {}}
              whileTap={canProceed() ? { scale: 0.97 } : {}}
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-display font-semibold text-sm transition-cinematic ${
                canProceed()
                  ? 'btn-primary-gradient text-on-primary'
                  : 'bg-surface-container-high text-outline cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </main>
  );
}
