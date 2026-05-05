import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Briefcase, User } from 'lucide-react'

const inputStyle = (isDark, border, focused) => ({
    width: '100%', padding: '14px 16px', borderRadius: 12,
    border: `1px solid ${focused ? '#6EA8FF' : border}`,
    background: isDark ? (focused ? 'rgba(110,168,255,0.06)' : 'rgba(255,255,255,0.03)') : (focused ? 'rgba(110,168,255,0.05)' : 'rgba(0,0,0,0.02)'),
    color: isDark ? '#E8E8F0' : '#1A1A2E',
    fontSize: 15, fontFamily: 'Nunito, sans-serif',
    outline: 'none', transition: 'all 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(110,168,255,0.1)' : 'none',
})

export default function Contact({ isDark }) {
    const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
    const [focused, setFocused] = useState(null)
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)

    const text = isDark ? '#E8E8F0' : '#1A1A2E'
    const muted = isDark ? '#8888A8' : '#6060A0'
    const cardBg = isDark ? '#16161F' : '#FFFFFF'
    const border = isDark ? 'rgba(110,168,255,0.12)' : 'rgba(110,168,255,0.2)'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        setSent(true)
    }

    const contacts = [
        { icon: Mail, label: 'Email', value: 'freeenowadev@gmail.com', color: '#6EA8FF' },
        { icon: Phone, label: 'Telepon', value: '+62 21 1234 5678', color: '#A78BFA' },
        { icon: MapPin, label: 'Alamat', value: 'Jakarta Selatan, Indonesia', color: '#6EA8FF' },
        { icon: MessageSquare, label: 'WhatsApp', value: '+62 881 0274 49163', color: '#A78BFA' },
    ]

    return (
        <div style={{ paddingTop: 100 }}>
            <section style={{ padding: '5rem 2rem 8rem' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }} className="contact-grid">
                        {/* Left Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span style={{
                                display: 'inline-block', padding: '6px 16px', borderRadius: 100,
                                background: 'rgba(110,168,255,0.1)', border: '1px solid rgba(110,168,255,0.25)',
                                color: '#6EA8FF', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                                marginBottom: 24,
                            }}>Hubungi Kami</span>

                            <h1 style={{
                                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1,
                                letterSpacing: '-0.03em', color: text, marginBottom: 20,
                            }}>
                                Siap Memulai<br />
                                <span style={{ background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Perjalanan Digital
                                </span>
                                <br />Anda?
                            </h1>

                            <p style={{ color: muted, fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>
                                Ceritakan proyek impian Anda kepada kami. Tim NOWA.IO akan segera menghubungi Anda dalam 24 jam untuk konsultasi gratis.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                                {contacts.map((c, i) => (
                                    <motion.div
                                        key={c.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                                    >
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                            background: `${c.color}12`, border: `1px solid ${c.color}25`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <c.icon size={18} color={c.color} />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 12, color: muted, fontWeight: 500, marginBottom: 2 }}>{c.label}</div>
                                            <div style={{ fontSize: 15, color: text, fontWeight: 600 }}>{c.value}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Response Time Badge */}
                            <div style={{
                                padding: '16px 20px', borderRadius: 14,
                                background: isDark ? 'rgba(110,168,255,0.06)' : 'rgba(110,168,255,0.08)',
                                border: `1px solid rgba(110,168,255,0.15)`,
                                display: 'flex', alignItems: 'center', gap: 12,
                            }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', flexShrink: 0 }} />
                                <span style={{ color: muted, fontSize: 13, lineHeight: 1.5 }}>
                                    Rata-rata waktu respons: <strong style={{ color: text }}>kurang dari 4 jam</strong> pada hari kerja
                                </span>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                padding: '2.5rem', borderRadius: 20,
                                background: cardBg, border: `1px solid ${border}`,
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ textAlign: 'center', padding: '3rem 1rem' }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', delay: 0.1, bounce: 0.5 }}
                                            style={{ marginBottom: 20 }}
                                        >
                                            <CheckCircle size={64} color="#6EA8FF" style={{ margin: '0 auto' }} />
                                        </motion.div>
                                        <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 24, color: text, marginBottom: 12 }}>Pesan Terkirim!</h3>
                                        <p style={{ color: muted, lineHeight: 1.7 }}>
                                            Terima kasih telah menghubungi kami. Tim NOWA akan segera merespons pesan Anda dalam waktu 24 jam.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            onClick={() => { setSent(false); setForm({ name: '', email: '', service: '', message: '' }) }}
                                            style={{
                                                marginTop: 24, padding: '12px 28px', borderRadius: 10, border: `1px solid ${border}`,
                                                background: 'transparent', color: '#6EA8FF', fontSize: 14, fontWeight: 600,
                                                cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                                            }}
                                        >Kirim Pesan Lagi</motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        onSubmit={handleSubmit}
                                        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                                    >
                                        <div>
                                            <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 22, color: text, marginBottom: 6 }}>Ceritakan Proyek Anda</h2>
                                            {/* <p style={{ color: muted, fontSize: 14 }}>Semua field dengan * wajib diisi</p> */}
                                        </div>

                                        {[
                                            { field: 'name', label: 'Nama Lengkap', placeholder: 'Budi Santoso', icon: User, type: 'text' },
                                            { field: 'email', label: 'Email', placeholder: 'budi@perusahaan.com', icon: Mail, type: 'email' },
                                        ].map(({ field, label, placeholder, icon: Icon, type }) => (
                                            <div key={field}>
                                                <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: text, marginBottom: 8 }}>{label}</label>
                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        type={type}
                                                        value={form[field]}
                                                        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                                                        onFocus={() => setFocused(field)}
                                                        onBlur={() => setFocused(null)}
                                                        placeholder={placeholder}
                                                        required
                                                        style={{ ...inputStyle(isDark, border, focused === field), paddingLeft: 44 }}
                                                    />
                                                    <Icon size={16} color={muted} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                                </div>
                                            </div>
                                        ))}

                                        <div>
                                            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: text, marginBottom: 8 }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={14} />Layanan yang Dibutuhkan</span>
                                            </label>
                                            <select
                                                value={form.service}
                                                onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                                                required
                                                style={{ ...inputStyle(isDark, border, focused === 'service'), appearance: 'none' }}
                                                onFocus={() => setFocused('service')}
                                                onBlur={() => setFocused(null)}
                                            >
                                                <option value="">Pilih layanan...</option>
                                                <option value="web">Web Development</option>
                                                <option value="ux">UI/UX Design</option>
                                                <option value="mobile">Mobile App</option>
                                                <option value="marketing">Digital Marketing</option>
                                                <option value="branding">Branding</option>
                                                <option value="other">Lainnya</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: text, marginBottom: 8 }}>Pesan</label>
                                            <textarea
                                                value={form.message}
                                                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                                onFocus={() => setFocused('message')}
                                                onBlur={() => setFocused(null)}
                                                placeholder="Ceritakan lebih detail tentang proyek, kebutuhan, dan timeline Anda..."
                                                required
                                                rows={5}
                                                style={{ ...inputStyle(isDark, border, focused === 'message'), resize: 'vertical' }}
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(110,168,255,0.35)' }}
                                            whileTap={{ scale: 0.97 }}
                                            type="submit"
                                            disabled={loading}
                                            style={{
                                                padding: '15px 32px', borderRadius: 12, border: 'none',
                                                background: loading ? 'rgba(110,168,255,0.5)' : 'linear-gradient(90deg, #6EA8FF, #A78BFA)',
                                                color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16,
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                            }}
                                        >
                                            {loading ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                        style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                                                    />
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <><Send size={18} /> Kirim Pesan</>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>

            <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}