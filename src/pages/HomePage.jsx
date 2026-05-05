import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Globe, Shield, Star, ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

export default function Home({ isDark }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const text = isDark ? '#E8E8F0' : '#1A1A2E'
  const muted = isDark ? '#8888A8' : '#6060A0'
  const cardBg = isDark ? '#16161F' : '#FFFFFF'
  const border = isDark ? 'rgba(110,168,255,0.12)' : 'rgba(110,168,255,0.2)'

  const stats = [
    { num: '0', label: 'Proyek Selesai' },
    { num: '0%', label: 'Kepuasan Klien' },
    { num: '1', label: 'Tahun Pengalaman' },
    { num: '2+', label: 'Tim Expert' },
  ]

  const services = [
    { icon: Globe, title: 'Web Development', desc: 'Aplikasi web modern yang cepat, aman, dan skalabel dengan teknologi terkini.', color: '#6EA8FF' },
    { icon: Sparkles, title: 'UI/UX Design', desc: 'Desain yang memukau dan intuitif, dirancang khusus untuk pengalaman pengguna terbaik.', color: '#A78BFA' },
    { icon: Zap, title: 'Digital Marketing', desc: 'Strategi pemasaran digital menyeluruh untuk memperluas jangkauan bisnis Anda.', color: '#6EA8FF' },
    { icon: Shield, title: 'Branding', desc: 'Identitas merek yang kuat dan konsisten untuk membedakan bisnis Anda dari kompetitor.', color: '#A78BFA' },
  ]

  const portfolioItems = [
    { title: 'FinTech Dashboard', cat: 'Web App', color: 'linear-gradient(135deg, #6EA8FF22, #A78BFA22)' },
    { title: 'E-Commerce Platform', cat: 'Fullstack', color: 'linear-gradient(135deg, #A78BFA22, #6EA8FF22)' },
    { title: 'Healthcare App', cat: 'Mobile', color: 'linear-gradient(135deg, #6EA8FF22, #A78BFA22)' },
  ]

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '8rem 2rem 5rem' }}>
        {/* Animated BG Orbs */}
        <motion.div style={{ y: yBg, opacity }} aria-hidden>
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            width: 900, height: 500,
            background: 'radial-gradient(ellipse, rgba(110,168,255,0.12) 0%, rgba(167,139,250,0.08) 50%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '20%', right: '10%',
              width: 300, height: 300,
              background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute', bottom: '20%', left: '5%',
              width: 250, height: 250,
              background: 'radial-gradient(circle, rgba(110,168,255,0.12) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }}
          />
        </motion.div>

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <motion.div variants={stagger} initial="hidden" animate="show" style={{ maxWidth: 800 }}>
            {/* Badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 18px', borderRadius: 100,
                background: isDark ? 'rgba(110,168,255,0.1)' : 'rgba(110,168,255,0.12)',
                border: `1px solid rgba(110,168,255,0.25)`,
                fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 600,
                color: '#6EA8FF', letterSpacing: '0.02em',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6EA8FF', display: 'inline-block', boxShadow: '0 0 8px #6EA8FF' }} />
                Innovative Digital Solution
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
              fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.05,
              letterSpacing: '-0.03em', color: text, marginBottom: 24,
            }}>
              Kami Membangun{' '}
              <span style={{
                background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Solusi Digital</span>
              <br />yang{' '}
              <span style={{
                position: 'relative', display: 'inline-block',
                background: 'linear-gradient(90deg, #A78BFA, #6EA8FF)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Menginspirasi</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: 18, lineHeight: 1.75, color: muted, marginBottom: 40, maxWidth: 560 }}>
              NOWA.IO solusi digital yang menghadirkan pengembangan website modern, teknologi machine learning, serta layanan editing kreatif untuk menciptakan pengalaman digital yang inovatif dan berdampak.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/kontak" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(110,168,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 32px', borderRadius: 12, border: 'none',
                    background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)',
                    color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 16,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  Mulai Proyek <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/portofolio" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '14px 32px', borderRadius: 12,
                    border: `1px solid ${border}`,
                    background: isDark ? 'rgba(110,168,255,0.06)' : 'rgba(110,168,255,0.08)',
                    color: text, fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 16,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  Lihat Portofolio
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Client Logos */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{ marginTop: 80, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
          >
            <span style={{ color: muted, fontSize: 13, fontWeight: 500 }}>Dipercaya oleh</span>
            {['Tokopedia', 'Gojek', 'Traveloka', 'OVO', 'Blibli'].map((brand) => (
              <span key={brand} style={{
                padding: '8px 18px', borderRadius: 8,
                border: `1px solid ${border}`,
                background: isDark ? 'rgba(110,168,255,0.05)' : 'rgba(110,168,255,0.07)',
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 13,
                color: muted, letterSpacing: '0.02em',
              }}>{brand}</span>
            ))}
          </motion.div> */}
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '5rem 2rem', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}
          >
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 48,
                  background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  lineHeight: 1, marginBottom: 8,
                }}>{s.num}</div>
                <div style={{ color: muted, fontSize: 15, fontWeight: 500 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EA8FF',
              }}>Apa yang Kami Lakukan</span>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: text, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
            }}>Layanan{' '}
              {/* <span style={{ background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Unggulan
              </span> */}
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: muted, fontSize: 17, marginBottom: 56, maxWidth: 500 }}>
              Solusi digital end-to-end yang dirancang khusus untuk kebutuhan bisnis modern Anda.
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {services.map((s, i) => (
                <motion.div
                  key={s.title} variants={fadeUp} custom={i}
                  whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(110,168,255,0.12)` }}
                  style={{  
                    padding: '2rem', borderRadius: 16,
                    background: cardBg, border: `1px solid ${border}`,
                    cursor: 'pointer', transition: 'box-shadow 0.3s',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${s.color}18`, border: `1px solid ${s.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  }}>
                    <s.icon size={22} color={s.color} />
                  </div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: text, marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: muted, fontSize: 14, lineHeight: 1.65 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} style={{ marginTop: 40, textAlign: 'center' }}>
              <Link to="/layanan" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.04 }} style={{
                  padding: '12px 28px', borderRadius: 10,
                  border: `1px solid ${border}`,
                  background: 'transparent',
                  color: '#6EA8FF', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 15,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Semua Layanan <ChevronRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section style={{ padding: '7rem 2rem', background: isDark ? '#0D0D15' : '#E8EDF8' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A78BFA', display: 'block', marginBottom: 12 }}>Karya Kami</span>
                <h2 style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  color: text, letterSpacing: '-0.03em', lineHeight: 1.1,
                }}>Portofolio <span style={{ background: 'linear-gradient(90deg, #A78BFA, #6EA8FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Terbaru</span></h2>
              </div>
              <Link to="/portofolio" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.04, x: 4 }} style={{
                  display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
                  color: '#6EA8FF', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 15, cursor: 'pointer',
                }}>Lihat Semua <ArrowRight size={16} /></motion.button>
              </Link>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {portfolioItems.map((item, i) => (
                <motion.div
                  key={item.title} variants={fadeUp} custom={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{
                    borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}`,
                    background: cardBg, cursor: 'pointer',
                  }}
                >
                  <div style={{ height: 200, background: item.color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: 16,
                      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }} />
                    <span style={{
                      position: 'absolute', top: 16, right: 16, padding: '4px 12px', borderRadius: 100,
                      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                      color: '#fff', fontSize: 12, fontWeight: 600,
                    }}>{item.cat}</span>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18, color: text }}>{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '8rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp}>
              <div style={{
                display: 'inline-flex', padding: '2px', borderRadius: 20,
                background: 'linear-gradient(135deg, #6EA8FF, #A78BFA)',
                marginBottom: 40,
              }}>
                <div style={{
                  padding: '3rem 3.5rem', borderRadius: 18,
                  background: isDark ? '#0A0A0F' : '#F0F4FF',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                    <Star size={18} color="#6EA8FF" fill="#6EA8FF" />
                    <span style={{ color: '#6EA8FF', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Siap Memulai?</span>
                  </div>
                  <h2 style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    color: text, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
                  }}>Mari Wujudkan Ide Anda<br />Bersama NOWA.IO</h2>
                  <p style={{ color: muted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                    Konsultasi gratis untuk proyek Anda. Tim kami siap memberikan solusi terbaik sesuai kebutuhan dan budget Anda.
                  </p>
                  <Link to="/kontak" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(110,168,255,0.5)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '14px 36px', borderRadius: 12, border: 'none',
                        background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)',
                        color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16,
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
                      }}
                    >
                      Hubungi Kami Sekarang <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}