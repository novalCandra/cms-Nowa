import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, ChevronRight, ExternalLink } from 'lucide-react'
import { useServices } from '../hooks/useServices'
import { usePortfolio } from '../hooks/usePortofolio'
import { ErrorState } from '../components/SharedUI'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
    })
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const CARD_COLORS = ['#6EA8FF', '#A78BFA']

const stats = [
    { num: '0', label: 'Proyek Selesai' },
    { num: '0%', label: 'Kepuasan Klien' },
    { num: '1', label: 'Tahun Pengalaman' },
    { num: '2+', label: 'Tim Expert' },
]

function ServicePreviewSkeleton() {
    return (
        <div className="p-8 rounded-2xl bg-[#16161F] border border-[rgba(110,168,255,0.12)] flex flex-col gap-3 [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)] animate-pulse">
            <div className="w-[52px] h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-[60%] h-5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-full h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-[80%] h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
        </div>
    )
}

function PortfolioPreviewSkeleton() {
    return (
        <div className="rounded-2xl overflow-hidden bg-[#16161F] border border-[rgba(110,168,255,0.12)] [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)] animate-pulse">
            <div className="h-48 bg-[rgba(255,255,255,0.04)] [.light_&]:bg-[rgba(0,0,0,0.05)]" />
            <div className="p-5 flex flex-col gap-3">
                <div className="w-[60%] h-5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
                <div className="w-full h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
                <div className="w-[80%] h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            </div>
        </div>
    )
}

export default function Home({ isDark }) {
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacityVal = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const { services, loading: svcLoading, error: svcError, retry: svcRetry } = useServices()
    const { projects, loading: portLoading, error: portError, retry: portRetry } = usePortfolio()

    const previewServices = services.slice(0, 3)
    const previewProjects = projects.slice(0, 3)

    const textColor = isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'
    const mutedColor = isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'
    const cardBg = isDark ? 'bg-[#16161F] border-[rgba(110,168,255,0.12)]' : 'bg-white border-[rgba(110,168,255,0.2)]'
    const sectionAlt = isDark ? 'bg-[#0D0D15]' : 'bg-[#E8EDF8]'

    return (
        <div>
            {/* ── HERO ── */}
            <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden px-8 pt-32 pb-20">
                <motion.div style={{ y: yBg, opacity: opacityVal }} aria-hidden className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(110,168,255,0.12) 0%, rgba(167,139,250,0.08) 50%, transparent 70%)', filter: 'blur(60px)' }} />
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)' }}
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                        className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(110,168,255,0.12) 0%, transparent 70%)' }}
                    />
                </motion.div>

                <div className="max-w-[1280px] mx-auto w-full relative z-[1]">
                    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[800px]">
                        <motion.div variants={fadeUp} className="mb-7">
                            <span className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full bg-[rgba(110,168,255,0.1)] border border-[rgba(110,168,255,0.25)] font-[Nunito] text-[13px] font-semibold text-[#6EA8FF] tracking-[0.02em]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6EA8FF] inline-block shadow-[0_0_8px_#6EA8FF]" />
                                Innovative Digital Solution
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(3rem,7vw,6rem)] leading-[1.05] tracking-[-0.03em] mb-6 ${textColor}`}
                        >
                            Kami Membangun{' '}
                            <span className="bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] bg-clip-text text-transparent">Solusi Digital</span>
                            <br />yang{' '}
                            <span className="relative inline-block bg-gradient-to-r from-[#A78BFA] to-[#6EA8FF] bg-clip-text text-transparent">Menginspirasi</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className={`text-[18px] leading-[1.75] mb-10 max-w-[560px] ${mutedColor}`}>
                            NOWA.IO solusi digital yang menghadirkan pengembangan website modern, teknologi machine learning, serta layanan editing kreatif untuk menciptakan pengalaman digital yang inovatif dan berdampak.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex gap-4 flex-wrap">
                            <Link to="/kontak" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(110,168,255,0.4)' }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-8 py-3.5 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-[Nunito] font-semibold text-base cursor-pointer flex items-center gap-2"
                                >
                                    Mulai Proyek <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <Link to="/portofolio" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`px-8 py-3.5 rounded-xl border font-[Nunito] font-semibold text-base cursor-pointer flex items-center gap-2 transition-all ${isDark
                                        ? 'border-[rgba(110,168,255,0.12)] bg-[rgba(110,168,255,0.06)] text-[#E8E8F0]'
                                        : 'border-[rgba(110,168,255,0.2)] bg-[rgba(110,168,255,0.08)] text-[#1A1A2E]'
                                        }`}
                                >
                                    Lihat Portofolio
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-[rgba(110,168,255,0.1)]"
                    >
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="font-[Plus_Jakarta_Sans] font-extrabold text-4xl bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] bg-clip-text text-transparent mb-1">
                                    {s.num}
                                </div>
                                <div className={`text-sm font-medium ${mutedColor}`}>{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── SERVICES PREVIEW ── */}
            <section className="py-28 px-8">
                <div className="max-w-[1280px] mx-auto">
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="mb-14">
                            <span className="font-[Nunito] text-[13px] font-semibold tracking-[0.1em] uppercase text-[#6EA8FF] block mb-3">
                                Apa yang Kami Tawarkan
                            </span>
                            <h2 className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] mb-5 ${textColor}`}>
                                Layanan <span className="bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] bg-clip-text text-transparent">Unggulan</span>
                            </h2>
                            <p className={`text-[17px] mb-14 max-w-[500px] ${mutedColor}`}>
                                Solusi digital end-to-end yang dirancang khusus untuk kebutuhan bisnis modern Anda.
                            </p>
                        </motion.div>

                        {svcLoading && (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                                {Array.from({ length: 4 }).map((_, i) => <ServicePreviewSkeleton key={i} />)}
                            </div>
                        )}

                        {!svcLoading && svcError && (
                            <ErrorState message={svcError} onRetry={svcRetry} label="Gagal memuat layanan" />
                        )}

                        {!svcLoading && !svcError && (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                                {previewServices.map((service, i) => {
                                    const color = CARD_COLORS[i % CARD_COLORS.length]
                                    const gradientTo = color === '#6EA8FF' ? '#A78BFA' : '#6EA8FF'
                                    return (
                                        <motion.div
                                            key={service.id}
                                            variants={fadeUp}
                                            custom={i}
                                            whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(110,168,255,0.12)' }}
                                            className={`p-8 rounded-2xl border cursor-pointer transition-shadow duration-300 ${cardBg}`}
                                        >
                                            <div
                                                className="w-[52px] h-1.5 rounded-full mb-5"
                                                style={{ background: `linear-gradient(90deg, ${color}, ${gradientTo})` }}
                                            />
                                            <h3 className={`font-[Plus_Jakarta_Sans] font-bold text-[18px] mb-2.5 ${textColor}`}>
                                                {service.nama}
                                            </h3>
                                            <p className={`text-sm leading-[1.65] ${mutedColor}`}>
                                                {service.deskripsi}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}

                        <motion.div variants={fadeUp} className="mt-10 text-center">
                            <Link to="/layanan" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    className={`px-7 py-3 rounded-xl border bg-transparent text-[#6EA8FF] font-[Nunito] font-semibold text-[15px] cursor-pointer inline-flex items-center gap-2 ${isDark ? 'border-[rgba(110,168,255,0.12)]' : 'border-[rgba(110,168,255,0.2)]'
                                        }`}
                                >
                                    Semua Layanan <ChevronRight size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── PORTFOLIO PREVIEW ── */}
            <section className={`py-28 px-8 ${sectionAlt}`}>
                <div className="max-w-[1280px] mx-auto">
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <motion.div variants={fadeUp} className="flex justify-between items-end mb-12 flex-wrap gap-5">
                            <div>
                                <span className="font-[Nunito] text-[13px] font-semibold tracking-[0.1em] uppercase text-[#A78BFA] block mb-3">Karya Kami</span>
                                <h2 className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] ${textColor}`}>
                                    Portofolio <span className="bg-gradient-to-r from-[#A78BFA] to-[#6EA8FF] bg-clip-text text-transparent">Terbaru</span>
                                </h2>
                            </div>
                            <Link to="/portofolio" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.04, x: 4 }}
                                    className="flex items-center gap-1.5 bg-transparent border-none text-[#6EA8FF] font-[Nunito] font-semibold text-[15px] cursor-pointer"
                                >
                                    Lihat Semua <ArrowRight size={16} />
                                </motion.button>
                            </Link>
                        </motion.div>

                        {portLoading && (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                                {Array.from({ length: 3 }).map((_, i) => <PortfolioPreviewSkeleton key={i} />)}
                            </div>
                        )}

                        {!portLoading && portError && (
                            <ErrorState message={portError} onRetry={portRetry} label="Gagal memuat portofolio" />
                        )}

                        {!portLoading && !portError && (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                                {previewProjects.map((project, i) => (
                                    <motion.div
                                        key={project.id}
                                        variants={fadeUp}
                                        custom={i}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        className={`rounded-2xl overflow-hidden border cursor-pointer ${cardBg}`}
                                    >
                                        <div className="h-48 relative overflow-hidden">
                                            <img
                                                src={project.imageUrl}
                                                alt={project.nama}
                                                className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                                                onError={e => {
                                                    e.currentTarget.style.display = 'none'
                                                    e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, rgba(110,168,255,0.2), rgba(167,139,250,0.2))'
                                                }}
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className={`font-[Plus_Jakarta_Sans] font-bold text-[18px] mb-2 ${textColor}`}>{project.nama}</h3>
                                            <p className={`text-[13px] leading-[1.65] mb-4 ${mutedColor}`}>{project.deskripsi}</p>
                                            <a
                                                href={project.link_portofolio}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[rgba(110,168,255,0.1)] border border-[rgba(110,168,255,0.2)] text-[#6EA8FF] text-[12px] font-semibold no-underline transition-colors hover:bg-[rgba(110,168,255,0.2)]"
                                            >
                                                Lihat Proyek <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-32 px-8">
                <div className="max-w-[800px] mx-auto text-center">
                    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <motion.div variants={fadeUp}>
                            <div className="inline-flex p-[2px] rounded-[20px] bg-gradient-to-br from-[#6EA8FF] to-[#A78BFA] mb-10">
                                <div className={`px-14 py-12 rounded-[18px] ${isDark ? 'bg-[#0A0A0F]' : 'bg-[#F0F4FF]'}`}>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <Star size={18} color="#6EA8FF" fill="#6EA8FF" />
                                        <span className="text-[#6EA8FF] text-[13px] font-semibold tracking-[0.08em] uppercase">Siap Memulai?</span>
                                    </div>
                                    <h2 className={`font-[Plus_Jakarta_Sans] font-extrabold text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] tracking-[-0.03em] mb-4 ${textColor}`}>
                                        Mari Wujudkan Ide Anda<br />Bersama NOWA.IO
                                    </h2>
                                    <p className={`text-base leading-[1.7] mb-8 ${mutedColor}`}>
                                        Konsultasi gratis untuk proyek Anda. Tim kami siap memberikan solusi terbaik sesuai kebutuhan dan budget Anda.
                                    </p>
                                    <Link to="/kontak" className="no-underline">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(110,168,255,0.5)' }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-9 py-3.5 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-[Nunito] font-bold text-base cursor-pointer inline-flex items-center gap-2.5"
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