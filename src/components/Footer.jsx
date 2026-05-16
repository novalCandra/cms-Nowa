import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoNowaDark from '../assets/logo-nowa-dark.png'
import logoNowaLight from '../assets/logo-nowa-light.png'
import { useServices } from '../hooks/useServices'


export default function Footer({ isDark }) {
    const { services } = useServices()

    const linkClass = `text-sm no-underline transition-colors duration-200 ${isDark ? 'text-[#8888A8] hover:text-[#E8E8F0]' : 'text-[#6060A0] hover:text-[#1A1A2E]'}`

    return (
        <footer className={`border-t pt-20 pb-8 px-8 ${isDark ? 'bg-[#0D0D15] border-[rgba(110,168,255,0.1)]' : 'bg-[#E8EDF8] border-[rgba(110,168,255,0.2)]'}`}>
            <div className="max-w-[1280px] mx-auto">
                {/* Top Grid */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2">
                        <img
                            src={isDark ? logoNowaDark : logoNowaLight}
                            alt="NOWA"
                            className="h-[150px] w-auto block select-none mb-0"
                        />
                        <p className={`text-[15px] leading-[1.7] max-w-[280px] mb-6 ${isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'}`}>
                            Kami membangun pengalaman digital yang tidak hanya indah, tetapi juga berdampak nyata bagi bisnis Anda.
                        </p>
                    </div>

                    {/* Halaman */}
                    <div>
                        <h4 className="font-[Plus_Jakarta_Sans] font-bold text-[14px] tracking-[0.08em] uppercase text-[#6EA8FF] mb-5">Halaman</h4>
                        <ul className="list-none flex flex-col gap-2.5">
                            <li><Link to="/" className={linkClass}>Beranda</Link></li>
                            <li><Link to="/layanan" className={linkClass}>Layanan</Link></li>
                            <li><Link to="/portofolio" className={linkClass}>Portofolio</Link></li>
                            <li><Link to="/berita" className={linkClass}>Berita</Link></li>
                            <li><Link to="/kontak" className={linkClass}>Kontak</Link></li>
                        </ul>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h4 className="font-[Plus_Jakarta_Sans] font-bold text-[14px] tracking-[0.08em] uppercase text-[#6EA8FF] mb-5">Layanan</h4>
                        <ul className="list-none flex flex-col gap-2.5">
                            {services.length > 0
                                ? services.map((service) => (
                                    <li key={service.id}>
                                        <Link to="/layanan" className={linkClass}>
                                            {service.nama}
                                        </Link>
                                    </li>
                                ))
                                : (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <li key={i}>
                                            <div className={`h-3.5 rounded w-[70%] animate-pulse ${isDark ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-[rgba(0,0,0,0.06)]'}`} />
                                        </li>
                                    ))
                                )
                            }
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="font-[Plus_Jakarta_Sans] font-bold text-[14px] tracking-[0.08em] uppercase text-[#6EA8FF] mb-5">Kontak</h4>
                        <ul className="list-none flex flex-col gap-2.5">
                            <li><a href="mailto:freeenowadev@gmail.com" className={linkClass}>freeenowadev@gmail.com</a></li>
                            <li><span className={linkClass}>Pasuruan, Indonesia</span></li>
                            <li><a href="tel:+622112345678" className={linkClass}>+62 21 1234 5678</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t pt-6 flex justify-between items-center flex-wrap gap-3 ${isDark ? 'border-[rgba(110,168,255,0.1)]' : 'border-[rgba(110,168,255,0.2)]'}`}>
                    <span className={`text-[13px] ${isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'}`}>© 2026 NOWA. All rights reserved.</span>
                    <span className={`text-[13px] ${isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'}`}>Crafted with ♥ in Pasuruan</span>
                </div>
            </div>
        </footer>
    )
}