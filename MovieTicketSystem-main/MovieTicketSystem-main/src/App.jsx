import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Booking from './pages/Booking';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-surface">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/booking/:movieId" element={<Booking />} />
            {/* Coming Soon — reuses Movies page for now */}
            <Route path="/coming-soon" element={<Movies />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
