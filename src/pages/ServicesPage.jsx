import { motion } from 'framer-motion'
import { Globe, Sparkles, Zap, Shield, Smartphone, BarChart3, ArrowRight, Check } from 'lucide-react'
import axios from 'axios'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
    })
}

const services = [
    {
        icon: Globe, title: 'Web Development', color: '#6EA8FF',
        desc: 'Kami membangun website dan aplikasi web dengan performa tinggi menggunakan teknologi modern seperti React, Next.js, dan Node.js.',
        features: ['Single Page Application (SPA)', 'Progressive Web App (PWA)', 'API Integration & Backend', 'Database Design & Management', 'Performance Optimization', 'Security Implementation'],
        price: 'Mulai dari Rp 15jt',
    },
    {
        icon: Sparkles, title: 'UI/UX Design', color: '#A78BFA',
        desc: 'Desain yang berpusat pada pengguna — kami menciptakan antarmuka yang indah sekaligus intuitif untuk meningkatkan konversi.',
        features: ['User Research & Persona', 'Wireframing & Prototyping', 'Visual Design (Figma)', 'Design System', 'Usability Testing', 'Handoff to Developer'],
        price: 'Mulai dari Rp 8jt',
    },
    {
        icon: Smartphone, title: 'Mobile App', color: '#6EA8FF',
        desc: 'Aplikasi mobile cross-platform untuk iOS dan Android menggunakan React Native yang terasa native dan performatif.',
        features: ['React Native Development', 'iOS & Android Support', 'Push Notifications', 'Offline Mode', 'App Store Optimization', 'Analytics Integration'],
        price: 'Mulai dari Rp 25jt',
    },
    {
        icon: Zap, title: 'Digital Marketing', color: '#A78BFA',
        desc: 'Strategi pemasaran digital yang terukur dan berbasis data untuk meningkatkan traffic, leads, dan penjualan Anda.',
        features: ['SEO On-page & Off-page', 'Google Ads Management', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Analytics & Reporting'],
        price: 'Mulai dari Rp 5jt/bulan',
    },
    {
        icon: Shield, title: 'Branding & Identity', color: '#6EA8FF',
        desc: 'Membangun identitas visual yang kuat dan konsisten — dari logo hingga brand guidelines yang komprehensif.',
        features: ['Brand Strategy', 'Logo Design', 'Brand Guidelines', 'Visual Identity System', 'Packaging Design', 'Brand Voice & Tone'],
        price: 'Mulai dari Rp 10jt',
    },
    {
        icon: BarChart3, title: 'Data & Analytics', color: '#A78BFA',
        desc: 'Transformasi data bisnis Anda menjadi insight yang actionable dengan dashboard dan laporan yang mudah dipahami.',
        features: ['Google Analytics Setup', 'Custom Dashboard', 'Data Visualization', 'A/B Testing', 'Funnel Analysis', 'Monthly Reporting'],
        price: 'Mulai dari Rp 7jt',
    },
]

export default function Services({ isDark }) {
    const text = isDark ? '#E8E8F0' : '#1A1A2E'
    const muted = isDark ? '#8888A8' : '#6060A0'
    const cardBg = isDark ? '#16161F' : '#FFFFFF'
    const border = isDark ? 'rgba(110,168,255,0.12)' : 'rgba(110,168,255,0.2)'

    return (
        <div style={{ paddingTop: 100 }}>
            {/* Hero */}
            <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <motion.div initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                        <motion.span variants={fadeUp} style={{
                            display: 'inline-block', padding: '6px 16px', borderRadius: 100,
                            background: 'rgba(110,168,255,0.1)', border: '1px solid rgba(110,168,255,0.25)',
                            color: '#6EA8FF', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                        }}>Layanan Kami</motion.span>

                        <motion.h1 variants={fadeUp} custom={1} style={{
                            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1,
                            letterSpacing: '-0.03em', color: text,
                        }}>
                            Solusi{' '}
                            <span style={{ background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Digital
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} custom={2} style={{ fontSize: 17, color: muted, lineHeight: 1.75 }}>
                            Dari strategi awal hingga peluncuran dan optimasi berkelanjutan — kami menjadi mitra digital terpercaya Anda di setiap langkah.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section style={{ padding: '2rem 2rem 8rem' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {services.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(110,168,255,0.1)` }}
                                style={{
                                    padding: '2rem', borderRadius: 16,
                                    background: cardBg, border: `1px solid ${border}`,
                                    cursor: 'pointer', transition: 'box-shadow 0.3s',
                                }}
                            >
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14,
                                    background: `${s.color}15`, border: `1px solid ${s.color}25`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                                }}>
                                    <s.icon size={24} color={s.color} />
                                </div>
                                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 20, color: text, marginBottom: 10 }}>{s.title}</h3>
                                <p style={{ color: muted, fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>{s.desc}</p>

                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                                    {s.features.map((f) => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: muted, fontSize: 13 }}>
                                            <Check size={14} color={s.color} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: `1px solid ${border}` }}>
                                    <span style={{
                                        fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14,
                                        background: `linear-gradient(90deg, ${s.color}, ${s.color === '#6EA8FF' ? '#A78BFA' : '#6EA8FF'})`,
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    }}>{s.price}</span>
                                    <motion.button whileHover={{ x: 4 }} style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        background: 'none', border: 'none', color: s.color,
                                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    }}>
                                        Konsultasi <ArrowRight size={14} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}