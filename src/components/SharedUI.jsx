import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

// Section Badge
export function SectionBadge({ children, color = 'blue' }) {
    const colors = {
        blue: 'bg-[rgba(110,168,255,0.1)] border-[rgba(110,168,255,0.25)] text-[#6EA8FF]',
        purple: 'bg-[rgba(167,139,250,0.1)] border-[rgba(167,139,250,0.25)] text-[#A78BFA]',
    }
    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-block px-4 py-1.5 rounded-full border text-[13px] font-semibold tracking-widest uppercase mb-5 ${colors[color]}`}
        >
            {children}
        </motion.span>
    )
}

// Page Hero 
export function PageHero({ badge, badgeColor, title, titleGradient, titleSuffix, description, maxWidth = 640 }) {
    return (
        <section className="pt-20 pb-16 px-8 text-center">
            <div className="mx-auto" style={{ maxWidth }}>
                <SectionBadge color={badgeColor}>{badge}</SectionBadge>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-[Plus_Jakarta_Sans] font-extrabold leading-[1.1] tracking-[-0.03em] text-[clamp(2.5rem,5vw,4rem)] text-[#E8E8F0] dark:text-[#E8E8F0] mb-4 [.light_&]:text-[#1A1A2E]"
                >
                    {title}{' '}
                    <span className="bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] bg-clip-text text-transparent">
                        {titleGradient}
                    </span>
                    {titleSuffix && <>{' '}{titleSuffix}</>}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#8888A8] text-base leading-relaxed [.light_&]:text-[#6060A0]"
                >
                    {description}
                </motion.p>
            </div>
        </section>
    )
}

// Skeleton Card
export function SkeletonCard({ hasImage = true, lines = 3 }) {
    return (
        <div className="rounded-2xl overflow-hidden bg-[#16161F] border border-[rgba(110,168,255,0.12)] [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)]">
            {hasImage && (
                <div className="h-48 bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            )}
            <div className="p-5 flex flex-col gap-2.5">
                <div className="w-[55%] h-4 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className={`h-3 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)] ${i === lines - 1 ? 'w-[70%]' : 'w-[90%]'}`} />
                ))}
                <div className="w-20 h-8 rounded-lg mt-1 bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            </div>
        </div>
    )
}

// Skeleton Featured
export function SkeletonFeatured() {
    return (
        <div className="rounded-[20px] overflow-hidden bg-[#16161F] border border-[rgba(110,168,255,0.12)] mb-8 grid grid-cols-2 max-[768px]:grid-cols-1 [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)]">
            <div className="h-80 bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]" />
            <div className="p-10 flex flex-col gap-3.5 justify-center">
                {[85, 70, 100, 90, 40].map((w, i) => (
                    <div key={i} className={`h-4 rounded bg-[rgba(255,255,255,0.05)] [.light_&]:bg-[rgba(0,0,0,0.06)]`} style={{ width: `${w}%` }} />
                ))}
            </div>
        </div>
    )
}

// Error State
export function ErrorState({ message, onRetry, label = 'Gagal memuat data' }) {
    return (
        <div className="text-center py-16 px-8">
            <AlertCircle size={40} color="#FF6B6B" className="mx-auto mb-4" />
            <p className="text-[#E8E8F0] font-semibold mb-2 [.light_&]:text-[#1A1A2E]">{label}</p>
            <p className="text-[#8888A8] text-sm mb-6 [.light_&]:text-[#6060A0]">{message}</p>
            <button
                onClick={onRetry}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-semibold text-sm border-none cursor-pointer"
            >
                Coba Lagi
            </button>
        </div>
    )
}

// Gradient Button
export function GradientButton({ children, onClick, type = 'button', disabled, className = '' }) {
    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.04, boxShadow: disabled ? 'none' : '0 0 40px rgba(110,168,255,0.4)' }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-bold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
        >
            {children}
        </motion.button>
    )
}

// Card wrapper
export function Card({ children, className = '', hover = true }) {
    const base = 'rounded-2xl bg-[#16161F] border border-[rgba(110,168,255,0.12)] [.light_&]:bg-white [.light_&]:border-[rgba(110,168,255,0.2)]'
    if (!hover) return <div className={`${base} ${className}`}>{children}</div>
    return (
        <motion.div
            whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(110,168,255,0.12)' }}
            className={`${base} ${className} transition-shadow duration-300 cursor-pointer`}
        >
            {children}
        </motion.div>
    )
}