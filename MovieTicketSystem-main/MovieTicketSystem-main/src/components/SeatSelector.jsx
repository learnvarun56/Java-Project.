import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * SeatSelector — Interactive cinema seat map
 * Follows the Cinematic Editorial design system:
 *   Available → surface-variant
 *   Selected  → primary (Cinema Red glow)
 *   VIP       → secondary (Popcorn Gold)
 *   Booked    → surface-container-high (disabled)
 */
export default function SeatSelector({ layout = [], onSelectionChange }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = useCallback(
    (seat) => {
      if (seat.status === 'booked') return;
      setSelectedSeats((prev) => {
        const exists = prev.find((s) => s.id === seat.id);
        const next = exists ? prev.filter((s) => s.id !== seat.id) : [...prev, seat];
        onSelectionChange?.(next);
        return next;
      });
    },
    [onSelectionChange]
  );

  const isSelected = (seatId) => selectedSeats.some((s) => s.id === seatId);

  const seatColor = (seat) => {
    if (isSelected(seat.id)) return 'bg-primary shadow-[0_0_16px_rgba(255,142,128,0.4)] text-on-primary';
    if (seat.status === 'booked') return 'bg-surface-container-high text-outline-variant cursor-not-allowed opacity-40';
    if (seat.status === 'vip') return 'bg-secondary/20 text-secondary hover:bg-secondary/40 cursor-pointer';
    return 'bg-surface-variant text-on-surface-variant hover:bg-surface-bright cursor-pointer';
  };

  return (
    <div className="w-full">
      {/* ── Screen Indicator ── */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-3/4 max-w-md h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-2" />
        <span className="text-label-sm text-on-surface-variant tracking-widest uppercase">Screen</span>
      </div>

      {/* ── Seat Grid ── */}
      <div className="flex flex-col items-center gap-2.5">
        {layout.map((row) => (
          <div key={row.row} className="flex items-center gap-2">
            <span className="w-6 text-center text-label-sm text-on-surface-variant font-medium">
              {row.row}
            </span>
            <div className="flex gap-1.5">
              {row.seats.map((seat, i) => (
                <motion.button
                  key={seat.id}
                  whileHover={seat.status !== 'booked' ? { scale: 1.15 } : {}}
                  whileTap={seat.status !== 'booked' ? { scale: 0.9 } : {}}
                  onClick={() => toggleSeat(seat)}
                  disabled={seat.status === 'booked'}
                  className={`w-8 h-8 rounded-md text-xs font-label font-medium transition-cinematic ${seatColor(seat)} ${
                    i === 3 || i === 8 ? 'ml-3' : '' /* Aisle gaps */
                  }`}
                >
                  {seat.number}
                </motion.button>
              ))}
            </div>
            <span className="w-6 text-center text-label-sm text-on-surface-variant font-medium">
              {row.row}
            </span>
          </div>
        ))}
      </div>

      {/* ── Legend ── */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {[
          { label: 'Available', color: 'bg-surface-variant' },
          { label: 'Selected', color: 'bg-primary shadow-[0_0_8px_rgba(255,142,128,0.4)]' },
          { label: 'VIP', color: 'bg-secondary/30' },
          { label: 'Booked', color: 'bg-surface-container-high opacity-40' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-sm ${item.color}`} />
            <span className="text-label-sm text-on-surface-variant">{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Selection Summary ── */}
      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-5 rounded-xl bg-surface-container-high/60 backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-label-sm text-on-surface-variant mb-1">Selected Seats</p>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((s) => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded-md bg-primary/15 text-primary text-label-sm font-semibold"
                  >
                    {s.id}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant">Total</p>
              <p className="text-headline-sm text-secondary font-bold">
                ${selectedSeats.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
