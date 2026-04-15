/* =========================================
   Cinemio — main.js
   ========================================= */

// ---- Filter tabs (index page) ----
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- Date & Time buttons (booking page) ----
document.querySelectorAll('.date-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateSummary();
  });
});

document.querySelectorAll('.time-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateSummary();
  });
});

// ---- Seat Map Generator ----
const seatMapEl = document.getElementById('seat-map');

const ROWS = ['A','B','C','D','E','F','G','H'];
const COLS = 12;
const PREMIUM_ROWS = ['D','E'];
// Pre-defined "booked" seats (simulate real data)
const BOOKED = new Set([
  'A3','A4','B7','B8','C2','C9','C10',
  'D5','D6','E3','E4','E5','F8','F9',
  'G2','G11','H6','H7'
]);

let selectedSeats = new Set();

if (seatMapEl) {
  ROWS.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.classList.add('seat-row');

    // Row label
    const label = document.createElement('span');
    label.classList.add('row-label');
    label.textContent = row;
    rowEl.appendChild(label);

    for (let col = 1; col <= COLS; col++) {
      // Aisle gap between col 6 and 7
      if (col === 7) {
        const aisle = document.createElement('div');
        aisle.classList.add('aisle');
        rowEl.appendChild(aisle);
      }

      const seatId = `${row}${col}`;
      const seat = document.createElement('button');
      seat.classList.add('seat');
      seat.setAttribute('aria-label', `Seat ${seatId}`);
      seat.dataset.id = seatId;

      if (PREMIUM_ROWS.includes(row)) seat.classList.add('premium');
      if (BOOKED.has(seatId)) {
        seat.classList.add('booked');
        seat.setAttribute('disabled', true);
      }

      seat.addEventListener('click', () => toggleSeat(seat, seatId, PREMIUM_ROWS.includes(row)));
      rowEl.appendChild(seat);
    }

    // Row label right
    const labelR = document.createElement('span');
    labelR.classList.add('row-label');
    labelR.textContent = row;
    rowEl.appendChild(labelR);

    seatMapEl.appendChild(rowEl);
  });
}

function toggleSeat(el, id, isPremium) {
  if (el.classList.contains('booked')) return;

  if (selectedSeats.has(id)) {
    selectedSeats.delete(id);
    el.classList.remove('selected');
  } else {
    if (selectedSeats.size >= 8) {
      showToast('Maximum 8 seats per booking');
      return;
    }
    selectedSeats.add(id);
    el.classList.add('selected');
  }
  updateSummary();
}

function updateSummary() {
  const seatsEl  = document.getElementById('s-seats');
  const totalEl  = document.getElementById('s-total');
  const dateBtn  = document.querySelector('.date-btn.active');
  const timeBtn  = document.querySelector('.time-btn.active');
  const dateEl   = document.getElementById('s-date');
  const timeEl   = document.getElementById('s-time');

  if (seatsEl) {
    if (selectedSeats.size === 0) {
      seatsEl.textContent = '— None selected';
    } else {
      seatsEl.textContent = [...selectedSeats].sort().join(', ');
    }
  }

  if (totalEl) {
    let total = 0;
    selectedSeats.forEach(id => {
      const row = id[0];
      const isPremium = PREMIUM_ROWS.includes(row);
      total += isPremium ? 280 : 200;
    });
    totalEl.textContent = `₹ ${total.toLocaleString('en-IN')}`;
  }

  if (dateEl && dateBtn) {
    dateEl.textContent = dateBtn.querySelector('span')?.textContent + ', ' + dateBtn.childNodes[0].textContent.trim();
  }
  if (timeEl && timeBtn) {
    timeEl.textContent = timeBtn.childNodes[0].textContent.trim();
  }
}

// ---- Toast ----
function showToast(msg) {
  const old = document.querySelector('.cinemio-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.classList.add('cinemio-toast');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: #1c1915; border: 1px solid #e8a83e; color: #f0ebe3;
    padding: 0.7rem 1.4rem; border-radius: 8px; font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif; z-index: 9999;
    animation: toast-in .25s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = `@keyframes toast-in { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
  document.head.appendChild(styleEl);

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

// ---- Proceed button guard ----
const proceedBtn = document.getElementById('proceed-btn');
if (proceedBtn) {
  proceedBtn.addEventListener('click', (e) => {
    if (selectedSeats.size === 0) {
      e.preventDefault();
      showToast('Please select at least one seat!');
    }
  });
}
