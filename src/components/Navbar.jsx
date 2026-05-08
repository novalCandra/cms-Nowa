import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import logoNowaDark from '../assets/logo-nowa-dark.png'
import logoNowaLight from '../assets/logo-nowa-light.png'

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

    const navItemClass = (path) =>
        `px-4 py-2 rounded-lg font-[Nunito] font-medium text-[15px] transition-all cursor-pointer ${
            location.pathname === path
                ? 'text-[#6EA8FF] bg-[rgba(110,168,255,0.1)]'
                : isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'
        }`

    const mobileItemClass = (path) =>
        `py-3.5 border-b font-[Plus_Jakarta_Sans] font-semibold text-lg ${
            isDark ? 'border-[rgba(110,168,255,0.1)]' : 'border-[rgba(110,168,255,0.2)]'
        } ${location.pathname === path ? 'text-[#6EA8FF]' : isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-[1000] px-8 transition-all duration-400 ${scrolled
                        ? isDark
                            ? 'bg-[rgba(10,10,15,0.92)] backdrop-blur-xl border-b border-[rgba(110,168,255,0.1)]'
                            : 'bg-[rgba(240,244,255,0.92)] backdrop-blur-xl border-b border-[rgba(110,168,255,0.2)]'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link to="/" className="no-underline">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center cursor-pointer">
                            <img
                                key={isDark ? 'logo-dark' : 'logo-light'}
                                src={isDark ? logoNowaDark : logoNowaLight}
                                alt="NOWA"
                                className="h-[150px] w-auto block select-none transition-opacity duration-300"
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-2 items-center">
                        <Link to="/" className="no-underline">
                            <motion.div whileHover={{ y: -1 }} className={navItemClass('/')}>Beranda</motion.div>
                        </Link>
                        <Link to="/layanan" className="no-underline">
                            <motion.div whileHover={{ y: -1 }} className={navItemClass('/layanan')}>Layanan</motion.div>
                        </Link>
                        <Link to="/portofolio" className="no-underline">
                            <motion.div whileHover={{ y: -1 }} className={navItemClass('/portofolio')}>Portofolio</motion.div>
                        </Link>
                        <Link to="/berita" className="no-underline">
                            <motion.div whileHover={{ y: -1 }} className={navItemClass('/berita')}>Berita</motion.div>
                        </Link>
                        <Link to="/kontak" className="no-underline">
                            <motion.div whileHover={{ y: -1 }} className={navItemClass('/kontak')}>Kontak</motion.div>
                        </Link>
                    </div>

                    {/* Right Controls */}
                    <div className="flex gap-3 items-center">
                        {/* Dark Mode Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsDark(!isDark)}
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${isDark
                                    ? 'border-[rgba(110,168,255,0.1)] bg-[rgba(110,168,255,0.08)] text-[#E8E8F0]'
                                    : 'border-[rgba(110,168,255,0.2)] bg-[rgba(110,168,255,0.12)] text-[#1A1A2E]'
                                }`}
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
                        <Link to="/kontak" className="no-underline hidden md:block">
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(110,168,255,0.35)' }}
                                whileTap={{ scale: 0.97 }}
                                className="px-[22px] py-2.5 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-[Nunito] font-semibold text-sm cursor-pointer tracking-[0.01em]"
                            >
                                Mulai Proyek
                            </motion.button>
                        </Link>

                        {/* Mobile Hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`md:hidden w-10 h-10 rounded-xl border bg-transparent cursor-pointer flex items-center justify-center transition-all ${isDark ? 'border-[rgba(110,168,255,0.1)] text-[#E8E8F0]' : 'border-[rgba(110,168,255,0.2)] text-[#1A1A2E]'
                                }`}
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
                        className={`fixed top-[72px] left-0 right-0 z-[999] backdrop-blur-xl px-8 py-6 border-b ${isDark
                                ? 'bg-[rgba(10,10,15,0.97)] border-[rgba(110,168,255,0.1)]'
                                : 'bg-[rgba(240,244,255,0.97)] border-[rgba(110,168,255,0.2)]'
                            }`}
                    >
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.00 }}>
                            <Link to="/" className="no-underline">
                                <div className={mobileItemClass('/')}>Beranda</div>
                            </Link>
                        </motion.div>
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 }}>
                            <Link to="/layanan" className="no-underline">
                                <div className={mobileItemClass('/layanan')}>Layanan</div>
                            </Link>
                        </motion.div>
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.10 }}>
                            <Link to="/portofolio" className="no-underline">
                                <div className={mobileItemClass('/portofolio')}>Portofolio</div>
                            </Link>
                        </motion.div>
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                            <Link to="/berita" className="no-underline">
                                <div className={mobileItemClass('/berita')}>Berita</div>
                            </Link>
                        </motion.div>
                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.20 }}>
                            <Link to="/kontak" className="no-underline">
                                <div className={mobileItemClass('/kontak')}>Kontak</div>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}