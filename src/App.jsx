import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/HomePage'
import Services from './pages/ServicesPage'
import Portfolio from './pages/PortofolioPage'
import News from './pages/NewsPage'
import Contact from './pages/ContactPage'

export default function App() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <BrowserRouter>
      <div className={isDark ? 'dark' : 'light'} style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#0A0A0F' : '#F0F4FF',
        color: isDark ? '#E8E8F0' : '#1A1A2E',
        transition: 'background-color 0.4s ease, color 0.4s ease',
      }}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/layanan" element={<Services isDark={isDark} />} />
          <Route path="/portofolio" element={<Portfolio isDark={isDark} />} />
          <Route path="/berita" element={<News isDark={isDark} />} />
          <Route path="/kontak" element={<Contact isDark={isDark} />} />
        </Routes>
        <Footer isDark={isDark} />
      </div>
    </BrowserRouter>
  )
}