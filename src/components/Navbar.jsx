import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import logoNowaDark from '../assets/logo-nowa-dark.png'
import logoNowaLight from '../assets/logo-nowa-light.png'

const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Layanan', path: '/layanan' },
    { label: 'Portofolio', path: '/portofolio' },
    { label: 'Berita', path: '/berita' },
    { label: 'Kontak', path: '/kontak' },
]

export default function Navbar({ isDark, setIsDark }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => setMobileOpen(false), [location])

    const bg = isDark
        ? scrolled ? 'rgba(10,10,15,0.92)' : 'transparent'
        : scrolled ? 'rgba(240,244,255,0.92)' : 'transparent'

    const textColor = isDark ? '#E8E8F0' : '#1A1A2E'
    const borderColor = isDark ? 'rgba(110,168,255,0.1)' : 'rgba(110,168,255,0.2)'

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: bg,
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? `1px solid ${borderColor}` : 'none',
                    transition: 'all 0.4s ease',
                    padding: '0 2rem',
                }}
            >
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        >
                            <img
                                key={isDark ? 'logo-dark' : 'logo-light'}
                                src={isDark ? logoNowaDark : logoNowaLight}
                                alt="NOWA"
                                width={130}
                                height={36}
                                style={{
                                    height: 150,
                                    width: 'auto',
                                    display: 'block',
                                    userSelect: 'none',
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Links */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="hidden-mobile">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                                    <motion.div
                                        whileHover={{ y: -1 }}
                                        style={{
                                            padding: '8px 16px', borderRadius: 8,
                                            fontFamily: 'Nunito, sans-serif', fontWeight: 500, fontSize: 15,
                                            color: isActive ? '#6EA8FF' : textColor,
                                            background: isActive ? 'rgba(110,168,255,0.1)' : 'transparent',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                        }}
                                    >{link.label}</motion.div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right Controls */}
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        {/* Dark Mode Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsDark(!isDark)}
                            style={{
                                width: 40, height: 40, borderRadius: 10,
                                border: `1px solid ${borderColor}`,
                                background: isDark ? 'rgba(110,168,255,0.08)' : 'rgba(110,168,255,0.12)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: textColor, transition: 'all 0.2s',
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isDark ? 'sun' : 'moon'}
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>

                        {/* CTA Button */}
                        <Link to="/kontak" style={{ textDecoration: 'none' }} className="hidden-mobile">
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(110,168,255,0.35)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '10px 22px', borderRadius: 10, border: 'none',
                                    background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)',
                                    color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 14,
                                    cursor: 'pointer', letterSpacing: '0.01em',
                                }}
                            >Mulai Proyek</motion.button>
                        </Link>

                        {/* Mobile Hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                display: 'none', width: 40, height: 40, borderRadius: 10,
                                border: `1px solid ${borderColor}`,
                                background: 'transparent', cursor: 'pointer',
                                alignItems: 'center', justifyContent: 'center', color: textColor,
                            }}
                            className="show-mobile"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
                            background: isDark ? 'rgba(10,10,15,0.97)' : 'rgba(240,244,255,0.97)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: `1px solid ${borderColor}`,
                            padding: '1.5rem 2rem',
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link to={link.path} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        padding: '14px 0', borderBottom: `1px solid ${borderColor}`,
                                        fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 18,
                                        color: location.pathname === link.path ? '#6EA8FF' : textColor,
                                    }}>{link.label}</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
        </>
    )
}