import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { usePortfolio } from '../hooks/usePortofolio'
import { PageHero, SkeletonCard, ErrorState } from '../components/SharedUI'

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(110,168,255,0.12)' }}
            className="rounded-2xl overflow-hidden bg-[#16161F] border border-[rgba(110,168,255,0.12)] cursor-pointer transition-shadow duration-300 [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)]"
        >
            {/* Thumbnail */}
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

            {/* Info */}
            <div className="p-5">
                <h3 className="font-[Plus_Jakarta_Sans] font-bold text-[17px] text-[#E8E8F0] mb-2 [.light_&]:text-[#1A1A2E]">
                    {project.nama}
                </h3>
                <p className="text-[#8888A8] text-[13px] leading-[1.65] mb-4 [.light_&]:text-[#6060A0]">
                    {project.deskripsi}
                </p>
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
    )
}

export default function Portfolio({ isDark }) {
    const { projects, loading, error, retry } = usePortfolio()

    return (
        <div className="pt-[100px]">
            <PageHero
                badge="Karya Terbaik"
                badgeColor="purple"
                title="Portofolio"
                titleGradient="Kami"
                description="Koleksi proyek terbaik yang telah kami selesaikan bersama klien dari berbagai industri."
            />

            <section className="px-8 pb-32">
                <div className="max-w-[1280px] mx-auto">

                    {loading && (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {!loading && error && (
                        <ErrorState message={error} onRetry={retry} label="Gagal memuat portofolio" />
                    )}

                    {!loading && !error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
                        >
                            {projects.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))}
                        </motion.div>
                    )}

                </div>
            </section>
        </div>
    )
}