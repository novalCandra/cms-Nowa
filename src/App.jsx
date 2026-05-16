import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import { AuthProvider } from './hooks/useAuth'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/HomePage'
import Services from './pages/ServicesPage'
import Portfolio from './pages/PortofolioPage'
import News from './pages/NewsPage'
import Contact from './pages/ContactPage'
import AdminLogin from './admin/pages/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminServices from './admin/pages/AdminServices'
import AdminPortfolio from './admin/pages/AdminPortofolio'
import AdminNews from './admin/pages/AdminNews'

// PUBLIC LAYOUT
function PublicLayout({ isDark, setIsDark, children }) {
  return (
    <div
      className={`min-h-screen transition-colors duration-400 
          ${isDark
          ? 'bg-[#0A0A0F] text-[#E8E8F0] dark'
          : 'bg-[#F0F4FF] text-[#1A1A2E] light'
        }`}
    >
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      {children}
      <Footer isDark={isDark} />
    </div>
  )
}

// PROTECTED ROUTE
function ProtectedAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/admin/login" replace />

  return children
}

function AppRoutes({ isDark, setIsDark }) {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={
        <PublicLayout isDark={isDark} setIsDark={setIsDark}>
          <Home isDark={isDark} />
        </PublicLayout>
      } />

      <Route path="/layanan" element={
        <PublicLayout isDark={isDark} setIsDark={setIsDark}>
          <Services isDark={isDark} />
        </PublicLayout>
      } />

      <Route path="/portofolio" element={
        <PublicLayout isDark={isDark} setIsDark={setIsDark}>
          <Portfolio isDark={isDark} />
        </PublicLayout>
      } />

      <Route path="/berita" element={
        <PublicLayout isDark={isDark} setIsDark={setIsDark}>
          <News isDark={isDark} />
        </PublicLayout>
      } />

      <Route path="/kontak" element={
        <PublicLayout isDark={isDark} setIsDark={setIsDark}>
          <Contact isDark={isDark} />
        </PublicLayout>
      } />

      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="layanan" element={<AdminServices />} />
        <Route path="portofolio" element={<AdminPortfolio />} />
        <Route path="berita" element={<AdminNews />} />
      </Route>
    </Routes>
  )
}

// APP
export default function App() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes isDark={isDark} setIsDark={setIsDark} />
      </BrowserRouter>
    </AuthProvider>
  )
}