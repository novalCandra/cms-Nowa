import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react'
import logoNowaDark from '../assets/logo-nowa-dark.png'
import logoNowaLight from '../assets/logo-nowa-light.png'

export default function Footer({ isDark }) {
    const bg = isDark ? '#0D0D15' : '#E8EDF8'
    const text = isDark ? '#E8E8F0' : '#1A1A2E'
    const muted = isDark ? '#8888A8' : '#6060A0'
    const border = isDark ? 'rgba(110,168,255,0.1)' : 'rgba(110,168,255,0.2)'

    return (
        <footer style={{ background: bg, borderTop: `1px solid ${border}`, padding: '5rem 2rem 2rem' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                {/* Top Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    {/* Brand */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <div>
                            <img
                                src={isDark ? logoNowaDark : logoNowaLight}
                                alt="NOWA"
                                style={{ height: 150, width: 'auto', display: 'block', userSelect: 'none' }}
                            />
                        </div>
                        <p style={{ color: muted, fontSize: 15, lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
                            Kami membangun pengalaman digital yang tidak hanya indah, tetapi juga berdampak nyata bagi bisnis Anda.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                                <motion.a key={i} href="#" whileHover={{ y: -3, color: '#6EA8FF' }} style={{
                                    width: 38, height: 38, borderRadius: 8, border: `1px solid ${border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted,
                                    textDecoration: 'none', transition: 'all 0.2s',
                                }}>
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {[
                        { title: 'Halaman', links: [['Beranda', '/'], ['Layanan', '/layanan'], ['Portofolio', '/portofolio'], ['Berita', '/berita'], ['Kontak', '/kontak']] },
                        { title: 'Layanan', links: [['Web Development', '#'], ['UI/UX Design', '#'], ['Branding', '#'], ['SEO & Marketing', '#'], ['Mobile App', '#']] },
                        { title: 'Kontak', links: [['freeenowadev@gmail.com', '#'], ['Surabaya, Indonesia', '#'], ['+62 21 1234 5678', '#']] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6EA8FF', marginBottom: 20 }}>
                                {col.title}
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {col.links.map(([label, href]) => (
                                    <li key={label}>
                                        <Link to={href} style={{ color: muted, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.target.style.color = text}
                                            onMouseLeave={e => e.target.style.color = muted}
                                        >{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <span style={{ color: muted, fontSize: 13 }}>© 2026 NOWA. All rights reserved.</span>
                    <span style={{ color: muted, fontSize: 13 }}>Crafted with ♥ in Surabaya</span>
                </div>
            </div>
        </footer>
    )
}