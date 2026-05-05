import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const categories = ['Semua', 'Web App', 'Mobile', 'Branding', 'E-Commerce']

const projects = [
  { title: 'FinTrack Dashboard', cat: 'Web App', tags: ['React', 'TypeScript', 'TailwindCSS'], grad: 'linear-gradient(135deg, #6EA8FF33, #A78BFA33)', year: '2025' },
  { title: 'ShopNow Platform', cat: 'E-Commerce', tags: ['Next.js', 'Stripe', 'PostgreSQL'], grad: 'linear-gradient(135deg, #A78BFA33, #6EA8FF33)', year: '2025' },
  { title: 'MedCare App', cat: 'Mobile', tags: ['React Native', 'Firebase'], grad: 'linear-gradient(135deg, #6EA8FF33, #A78BFA44)', year: '2025' },
  { title: 'Nusantara Brand', cat: 'Branding', tags: ['Figma', 'Illustrator'], grad: 'linear-gradient(135deg, #A78BFA44, #6EA8FF33)', year: '2024' },
  { title: 'EduLearn LMS', cat: 'Web App', tags: ['Vue.js', 'Django', 'MySQL'], grad: 'linear-gradient(135deg, #6EA8FF44, #A78BFA22)', year: '2024' },
  { title: 'FoodBox Delivery', cat: 'Mobile', tags: ['Flutter', 'Node.js'], grad: 'linear-gradient(135deg, #A78BFA22, #6EA8FF44)', year: '2024' },
  { title: 'Luxora Boutique', cat: 'E-Commerce', tags: ['Shopify', 'Liquid', 'Custom'], grad: 'linear-gradient(135deg, #6EA8FF22, #A78BFA44)', year: '2024' },
  { title: 'CloudSync SaaS', cat: 'Web App', tags: ['React', 'AWS', 'Microservices'], grad: 'linear-gradient(135deg, #A78BFA44, #6EA8FF22)', year: '2023' },
  { title: 'Archipelago Identity', cat: 'Branding', tags: ['Figma', 'Brand Strategy'], grad: 'linear-gradient(135deg, #6EA8FF33, #A78BFA44)', year: '2023' },
]

export default function Portfolio({ isDark }) {
  const [active, setActive] = useState('Semua')
  const text = isDark ? '#E8E8F0' : '#1A1A2E'
  const muted = isDark ? '#8888A8' : '#6060A0'
  const cardBg = isDark ? '#16161F' : '#FFFFFF'
  const border = isDark ? 'rgba(110,168,255,0.12)' : 'rgba(110,168,255,0.2)'

  const filtered = active === 'Semua' ? projects : projects.filter(p => p.cat === active)

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero */}
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: 100,
              background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)',
              color: '#A78BFA', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: 20,
            }}>Karya Terbaik</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1,
              letterSpacing: '-0.03em', color: text, marginBottom: 16,
            }}>
            Portofolio{' '}
            <span style={{ background: 'linear-gradient(90deg, #A78BFA, #6EA8FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Kami
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: muted, fontSize: 16, lineHeight: 1.75 }}>
            Koleksi proyek terbaik yang telah kami selesaikan bersama klien dari berbagai industri.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '0 2rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            {categories.map((cat) => (
              <motion.button
                key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActive(cat)}
                style={{
                  padding: '8px 20px', borderRadius: 100,
                  border: `1px solid ${active === cat ? 'transparent' : border}`,
                  background: active === cat ? 'linear-gradient(90deg, #6EA8FF, #A78BFA)' : 'transparent',
                  color: active === cat ? '#fff' : muted,
                  fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 14,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{cat}</motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(110,168,255,0.12)' }}
                  style={{
                    borderRadius: 16, overflow: 'hidden',
                    background: cardBg, border: `1px solid ${border}`,
                    cursor: 'pointer', transition: 'box-shadow 0.3s',
                  }}
                >
                  <div style={{ height: 180, background: project.grad, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      width: 70, height: 70, borderRadius: 14,
                      background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }} />
                    <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: 6,
                        background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)',
                        color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                      }}>{project.cat}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{project.year}</span>
                    </div>
                    <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 8 }}>
                      <motion.div whileHover={{ scale: 1.2 }} style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                      }}>
                        <ExternalLink size={14} color="#fff" />
                      </motion.div>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 17, color: text, marginBottom: 10 }}>{project.title}</h3>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{
                          padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                          background: isDark ? 'rgba(110,168,255,0.08)' : 'rgba(110,168,255,0.1)',
                          color: '#6EA8FF', border: '1px solid rgba(110,168,255,0.15)',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}