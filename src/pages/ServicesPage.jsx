import { motion } from 'framer-motion'
import { useServices } from '../hooks/useServices'
import { PageHero, ErrorState } from '../components/SharedUI'

const CARD_COLORS = ['#6EA8FF', '#A78BFA']

function ServiceCard({ service, index }) {
    const color = CARD_COLORS[index % CARD_COLORS.length]
    const gradientTo = color === '#6EA8FF' ? '#A78BFA' : '#6EA8FF'

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(110,168,255,0.1)' }}
            className="p-8 rounded-2xl bg-[#16161F] border border-[rgba(110,168,255,0.12)] cursor-pointer transition-shadow duration-300 [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)]"
        >
                <div
                    className="w-[52px] h-1.5 rounded-full mb-5"
                    style={{ background: `linear-gradient(90deg, ${color}, ${gradientTo})` }}
                />
            <h3 className="font-[Plus_Jakarta_Sans] font-bold text-xl text-[#E8E8F0] mb-2.5 [.light_&]:text-[#1A1A2E]">
                {service.nama}
            </h3>
            <p className="text-[#8888A8] text-sm leading-[1.65] mb-6 [.light_&]:text-[#6060A0]">
                {service.deskripsi}
            </p>
        </motion.div>
    )
}

function ServiceSkeleton() {
    return (
        <div className="p-8 rounded-2xl bg-[#16161F] border border-[rgba(110,168,255,0.12)] flex flex-col gap-3 [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)]">
            <div className="w-[52px] h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-[60%] h-5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-full h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-[85%] h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="w-[75%] h-3.5 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
        </div>
    )
}

export default function Services({ isDark }) {
    const { services, loading, error, retry } = useServices()

    return (
        <div className="pt-[100px]">
            <PageHero
                badge="Layanan Kami"
                badgeColor="blue"
                title="Solusi"
                titleGradient="Digital"
                description="Dari strategi awal hingga peluncuran dan optimasi berkelanjutan — kami menjadi mitra digital terpercaya Anda di setiap langkah."
                maxWidth={720}
            />

            <section className="px-8 pb-32 pt-8">
                <div className="max-w-[1280px] mx-auto">

                    {loading && (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
                            {Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}
                        </div>
                    )}

                    {!loading && error && (
                        <ErrorState message={error} onRetry={retry} label="Gagal memuat layanan" />
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
                            {services.map((service, i) => (
                                <ServiceCard key={service.id} service={service} index={i} />
                            ))}
                        </div>
                    )}

                </div>
            </section>
        </div>
    )
}