import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight, X, Newspaper } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNews, useNewsDetail } from '../hooks/useNews'
import { PageHero, SkeletonCard, SkeletonFeatured, ErrorState } from '../components/SharedUI'

function formatDate(dateStr) {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

function readingTime(text) {
    if (!text) return '1 menit'
    const words = text.split(' ').length
    const minutes = Math.max(1, Math.round(words / 200))
    return `${minutes} menit`
}

// Detail Modal
function DetailModal({ articleId, onClose }) {
    const { article, loading, error } = useNewsDetail(articleId)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={e => e.stopPropagation()}
                    className="relative w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#0D0D1A] border border-[rgba(110,168,255,0.1)] shadow-[0_60px_120px_rgba(0,0,0,0.85)]"
                >
                    {/* Close button — selalu tampil */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
                    >
                        <X size={15} />
                    </motion.button>

                    {/* Loading state */}
                    {loading && (
                        <div className="flex flex-col gap-4 p-8 pt-12">
                            <div className="w-full h-56 rounded-2xl bg-[rgba(110,168,255,0.06)] animate-pulse" />
                            <div className="flex gap-2">
                                <div className="h-6 w-28 rounded-full bg-[rgba(110,168,255,0.06)] animate-pulse" />
                                <div className="h-6 w-20 rounded-full bg-[rgba(255,255,255,0.04)] animate-pulse" />
                            </div>
                            <div className="h-7 w-3/4 rounded-lg bg-[rgba(110,168,255,0.06)] animate-pulse" />
                            <div className="h-4 w-full rounded bg-[rgba(255,255,255,0.04)] animate-pulse" />
                            <div className="h-4 w-5/6 rounded bg-[rgba(255,255,255,0.04)] animate-pulse" />
                            <div className="h-4 w-4/5 rounded bg-[rgba(255,255,255,0.04)] animate-pulse" />
                        </div>
                    )}

                    {/* Error state */}
                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 px-8">
                            <div className="w-12 h-12 rounded-2xl bg-[rgba(255,80,80,0.08)] border border-[rgba(255,80,80,0.12)] flex items-center justify-center">
                                <Newspaper size={22} className="text-[rgba(255,80,80,0.4)]" />
                            </div>
                            <p className="text-[#666688] text-[14px] font-[Nunito] text-center">{error}</p>
                        </div>
                    )}

                    {/* Content */}
                    {!loading && !error && article && (
                        <>
                            {/* Hero image */}
                            <div className="relative h-64 overflow-hidden rounded-t-[28px]">
                                {article.imageUrl ? (
                                    <img
                                        src={article.imageUrl}
                                        alt={article.judul}
                                        className="w-full h-full object-cover"
                                        onError={e => {
                                            e.currentTarget.style.display = 'none'
                                            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, rgba(110,168,255,0.12), rgba(167,139,250,0.2))'
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[rgba(110,168,255,0.12)] to-[rgba(167,139,250,0.2)] flex items-center justify-center">
                                        <Newspaper size={44} className="text-[rgba(110,168,255,0.35)]" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A] via-[#0D0D1A]/20 to-transparent" />
                            </div>

                            {/* Content body */}
                            <div className="px-8 pb-10 -mt-4 relative">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <span className="flex items-center gap-1.5 text-[#6EA8FF] text-[11.5px] font-semibold bg-[rgba(110,168,255,0.08)] border border-[rgba(110,168,255,0.18)] px-3 py-1 rounded-full">
                                        <Calendar size={10} />
                                        {formatDate(article.tanggal)}
                                    </span>
                                    {/* <span className="flex items-center gap-1.5 text-[#666688] text-[11.5px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] px-3 py-1 rounded-full">
                                        <Clock size={10} />
                                        {readingTime(article.deskripsi)} baca
                                    </span> */}
                                </div>

                                <h2 className="font-[Plus_Jakarta_Sans] font-extrabold text-[24px] text-[#E8E8F2] leading-[1.28] mb-5 tracking-[-0.3px]">
                                    {article.judul}
                                </h2>

                                <div className="h-px bg-gradient-to-r from-[rgba(110,168,255,0.35)] via-[rgba(167,139,250,0.2)] to-transparent mb-6" />

                                <p className="text-[#9898BC] text-[14.5px] leading-[1.9] font-[Nunito]">
                                    {article.deskripsi}
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

// Featured Card
function FeaturedCard({ article, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group relative rounded-[24px] overflow-hidden mb-10 cursor-pointer h-[480px] max-[768px]:h-[380px]"
        >
            {article.imageUrl ? (
                <img
                    src={article.imageUrl}
                    alt={article.judul}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => { e.currentTarget.style.display = 'none' }}
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(110,168,255,0.2)] to-[rgba(167,139,250,0.3)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="absolute top-6 left-6">
                <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(110,168,255,0.15)] backdrop-blur-md border border-[rgba(110,168,255,0.3)] text-[#6EA8FF] text-[12px] font-bold tracking-wide uppercase">
                    ✦ Artikel Utama
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 max-[768px]:p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-white/60 text-[12px]">
                        <Calendar size={11} /> {formatDate(article.tanggal)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    {/* <span className="flex items-center gap-1.5 text-white/60 text-[12px]">
                        <Clock size={11} /> {readingTime(article.deskripsi)} baca
                    </span> */}
                </div>
                <h2 className="font-[Plus_Jakarta_Sans] font-extrabold text-[28px] max-[768px]:text-[20px] text-white leading-[1.2] mb-3 tracking-[-0.4px] max-w-[680px]">
                    {article.judul}
                </h2>
                <p className="text-white/60 text-[14px] leading-[1.6] max-w-[560px] mb-5 max-[768px]:hidden">
                    {article.deskripsi?.slice(0, 160)}{article.deskripsi?.length > 160 ? '...' : ''}
                </p>
                <motion.div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0D0D1A] text-[13px] font-bold font-[Nunito] group-hover:gap-3 transition-all duration-300">
                    Baca Selengkapnya <ArrowRight size={14} />
                </motion.div>
            </div>
        </motion.div>
    )
}

// Article Card
function ArticleCard({ article, index, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="group cursor-pointer flex flex-col rounded-[18px] overflow-hidden bg-[#0F0F1C] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(110,168,255,0.25)] transition-all duration-400 hover:shadow-[0_24px_64px_rgba(110,168,255,0.07)]"
        >
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0A0A14]">
                {article.imageUrl || article.imageurl ? (
                    <img
                        src={article.imageUrl || article.imageurl}
                        alt={article.judul}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        onError={e => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(110,168,255,0.1))'
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[rgba(167,139,250,0.1)] to-[rgba(110,168,255,0.1)] flex items-center justify-center">
                        <Newspaper size={28} className="text-[rgba(110,168,255,0.25)]" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1C] via-transparent to-transparent opacity-70" />
                <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6EA8FF] bg-[rgba(0,0,0,0.55)] backdrop-blur-md border border-[rgba(110,168,255,0.2)] px-2.5 py-1 rounded-full">
                        <Calendar size={9} />
                        {formatDate(article.tanggal || article.date)}
                    </span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1 gap-2.5">
                {/* <span className="flex items-center gap-1.5 text-[11px] text-[#555577] w-fit">
                    <Clock size={10} />
                    {readingTime(article.deskripsi || article.excerpt)} baca
                </span> */}
                <h3 className="font-[Plus_Jakarta_Sans] font-bold text-[14.5px] leading-[1.45] text-[#DEDEF0] group-hover:text-[#6EA8FF] transition-colors duration-300 line-clamp-2">
                    {article.judul || article.nama}
                </h3>
                <p className="text-[#50507A] text-[12.5px] leading-[1.7] line-clamp-2 flex-1">
                    {article.deskripsi || article.excerpt}
                </p>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
                    <span className="text-[11px] text-[#6EA8FF] font-bold font-[Nunito] tracking-wide uppercase flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                        Baca artikel <ArrowRight size={11} />
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

// Main Component
export default function News() {
    const { news, loading, error, retry } = useNews()
    const [selectedId, setSelectedId] = useState(null)

    const featured = news[0] ?? null
    const rest = news.slice(1)

    return (
        <>
            <div className="pt-[100px]">
                <PageHero
                    badge="Berita & Insight"
                    badgeColor="blue"
                    title="Cerita &"
                    titleGradient="Update"
                    titleSuffix="Terbaru"
                    description="Temukan artikel, insight, dan update terbaru dari tim NOWA.IO tentang dunia digital dan teknologi."
                />

                <section className="px-8 pb-32 max-[768px]:px-4">
                    <div className="max-w-[1280px] mx-auto">

                        {loading && (
                            <>
                                <SkeletonFeatured />
                                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                                    {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
                                </div>
                            </>
                        )}

                        {!loading && error && (
                            <ErrorState message={error} onRetry={retry} label="Gagal memuat berita" />
                        )}

                        {!loading && !error && featured && (
                            <>
                                <FeaturedCard article={featured} onClick={() => setSelectedId(featured.id)} />

                                {rest.length > 0 && (
                                    <>
                                        <div className="flex items-center gap-4 mb-7">
                                            <span className="font-[Plus_Jakarta_Sans] font-bold text-[15px] text-[#8888A8] uppercase tracking-[0.1em]">
                                                Artikel Lainnya
                                            </span>
                                            <div className="flex-1 h-px bg-gradient-to-r from-[rgba(110,168,255,0.2)] to-transparent" />
                                        </div>
                                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                                            {rest.map((article, i) => (
                                                <ArticleCard
                                                    key={article.id}
                                                    article={article}
                                                    index={i}
                                                    onClick={() => setSelectedId(article.id)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {!loading && !error && !featured && (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-[rgba(110,168,255,0.08)] border border-[rgba(110,168,255,0.12)] flex items-center justify-center">
                                    <Newspaper size={28} className="text-[#555577]" />
                                </div>
                                <p className="text-[#555577] text-[15px] font-[Nunito]">Belum ada berita tersedia</p>
                            </div>
                        )}

                    </div>
                </section>
            </div>

            {selectedId && (
                <DetailModal
                    articleId={selectedId}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </>
    )
}