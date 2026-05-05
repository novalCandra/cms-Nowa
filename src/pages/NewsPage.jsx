import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

const news = [
  {
    title: 'NOWA Raih Penghargaan Best Digital Agency 2025',
    excerpt: 'Kami dengan bangga mengumumkan bahwa NOWA berhasil meraih penghargaan prestisius Best Digital Agency Indonesia 2025 dari Indonesia Digital Awards.',
    cat: 'Penghargaan', date: '28 Apr 2026', readTime: '3 min',
    grad: 'linear-gradient(135deg, #6EA8FF22, #A78BFA33)',
    featured: true,
  },
  {
    title: 'Tren Web Design 2026: Apa yang Harus Anda Tahu',
    excerpt: 'Temukan tren desain web terbaru yang akan mendominasi tahun 2026, dari glassmorphism hingga motion design yang semakin imersif.',
    cat: 'Insight', date: '22 Apr 2026', readTime: '5 min',
    grad: 'linear-gradient(135deg, #A78BFA22, #6EA8FF22)',
  },
  {
    title: 'Mengapa UX yang Baik Meningkatkan Konversi Hingga 400%',
    excerpt: 'Studi terbaru menunjukkan korelasi langsung antara investasi UX design dengan peningkatan signifikan dalam tingkat konversi dan retensi pengguna.',
    cat: 'Artikel', date: '15 Apr 2026', readTime: '7 min',
    grad: 'linear-gradient(135deg, #6EA8FF33, #A78BFA22)',
  },
  {
    title: 'NOWA Berhasil Selesaikan Proyek Flagship untuk Tokopedia',
    excerpt: 'Tim NOWA berhasil meluncurkan redesign total platform dashboard seller Tokopedia yang kini melayani lebih dari 10 juta merchant aktif.',
    cat: 'Proyek', date: '10 Apr 2026', readTime: '4 min',
    grad: 'linear-gradient(135deg, #A78BFA33, #6EA8FF22)',
  },
  {
    title: 'React 20 Rilis: Fitur Baru yang Mengubah Cara Kita Develop',
    excerpt: 'Versi terbaru React membawa perubahan besar dalam cara kita membangun aplikasi web. Berikut fitur-fitur utama yang perlu Anda ketahui.',
    cat: 'Teknologi', date: '5 Apr 2026', readTime: '6 min',
    grad: 'linear-gradient(135deg, #6EA8FF22, #A78BFA44)',
  },
  {
    title: 'Workshop UI/UX Gratis untuk 50 Peserta Terpilih',
    excerpt: 'Daftarkan diri Anda untuk mengikuti workshop intensif UI/UX Design yang dipandu langsung oleh lead designer NOWA.',
    cat: 'Event', date: '1 Apr 2026', readTime: '2 min',
    grad: 'linear-gradient(135deg, #A78BFA44, #6EA8FF33)',
  },
]

const catColors = {
  Penghargaan: '#6EA8FF', Insight: '#A78BFA', Artikel: '#6EA8FF',
  Proyek: '#A78BFA', Teknologi: '#6EA8FF', Event: '#A78BFA',
}

export default function News({ isDark }) {
  const text = isDark ? '#E8E8F0' : '#1A1A2E'
  const muted = isDark ? '#8888A8' : '#6060A0'
  const cardBg = isDark ? '#16161F' : '#FFFFFF'
  const border = isDark ? 'rgba(110,168,255,0.12)' : 'rgba(110,168,255,0.2)'

  const featured = news[0]
  const rest = news.slice(1)

  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ padding: '5rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: 100,
              background: 'rgba(110,168,255,0.1)', border: '1px solid rgba(110,168,255,0.25)',
              color: '#6EA8FF', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: 20,
            }}>Berita & Insight</motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1,
              letterSpacing: '-0.03em', color: text, marginBottom: 16,
            }}>
            Cerita & <span style={{ background: 'linear-gradient(90deg, #6EA8FF, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Update</span> Terbaru
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: muted, fontSize: 16, lineHeight: 1.75 }}>
            Temukan artikel, insight, dan update terbaru dari tim NOWA.IO tentang dunia digital dan teknologi.
          </motion.p>
        </div>
      </section>

      <section style={{ padding: '0 2rem 8rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            whileHover={{ y: -4, boxShadow: '0 24px 80px rgba(110,168,255,0.12)' }}
            style={{
              borderRadius: 20, overflow: 'hidden',
              background: cardBg, border: `1px solid ${border}`,
              marginBottom: 32, cursor: 'pointer', display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              transition: 'box-shadow 0.3s',
            }}
            className="featured-card"
          >
            <div style={{ height: 320, background: featured.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: 100, height: 100, borderRadius: 20,
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)',
              }} />
              <span style={{
                position: 'absolute', top: 20, left: 20,
                padding: '6px 14px', borderRadius: 8,
                background: 'rgba(110,168,255,0.9)', color: '#fff',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
              }}>⭐ Featured</span>
            </div>
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 6, marginBottom: 16,
                background: `${catColors[featured.cat]}15`,
                color: catColors[featured.cat], fontSize: 12, fontWeight: 700,
                width: 'fit-content',
              }}>
                <Tag size={11} />{featured.cat}
              </span>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 24, color: text, lineHeight: 1.3, marginBottom: 12 }}>{featured.title}</h2>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: muted, fontSize: 13 }}>
                  <Calendar size={13} />{featured.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: muted, fontSize: 13 }}>
                  <Clock size={13} />{featured.readTime} baca
                </span>
              </div>
            </div>
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {rest.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(110,168,255,0.1)' }}
                style={{
                  borderRadius: 16, overflow: 'hidden',
                  background: cardBg, border: `1px solid ${border}`,
                  cursor: 'pointer', transition: 'box-shadow 0.3s',
                }}
              >
                <div style={{ height: 160, background: article.grad, position: 'relative' }}>
                  <span style={{
                    position: 'absolute', top: 14, left: 14,
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px', borderRadius: 6,
                    background: `${catColors[article.cat]}22`, backdropFilter: 'blur(8px)',
                    color: catColors[article.cat], fontSize: 11, fontWeight: 700,
                  }}>
                    <Tag size={10} />{article.cat}
                  </span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 16, color: text, lineHeight: 1.4, marginBottom: 10 }}>{article.title}</h3>
                  <p style={{ color: muted, fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 14 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: muted, fontSize: 12 }}>
                        <Calendar size={11} />{article.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: muted, fontSize: 12 }}>
                        <Clock size={11} />{article.readTime}
                      </span>
                    </div>
                    <motion.div whileHover={{ x: 3 }} style={{ color: '#6EA8FF', cursor: 'pointer' }}>
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .featured-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}