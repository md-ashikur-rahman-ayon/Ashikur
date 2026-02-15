
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Accomplishments from './components/Accomplishments';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import PortfolioPage from './pages/PortfolioPage';
import AdminPanel from './pages/AdminPanel';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import { DataProvider } from './context/DataContext';

const LandingPage = () => (
  <div className="bg-white selection:bg-black selection:text-white">
    <Navbar />
    <Hero />
    <About />
    <Experience />
    <Accomplishments />
    <Portfolio />
    <Contact />
  </div>
);

function App() {
  return (
    <DataProvider>
      <Router>
        <SmoothScroll />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
