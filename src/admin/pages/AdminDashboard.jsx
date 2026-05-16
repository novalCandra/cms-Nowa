import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Activity, Star, Eye } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { staticStats, getCards, recentActivity, typeColor, typeLabel, quickActions } from '../../data/DashboardData'

export default function AdminDashboard() {
  const { user } = useAuth()
  const cards = getCards(staticStats)

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            onClick={() => card.link && (window.location.href = card.link)}
            className="p-6 rounded-2xl bg-[#0F0F1A] border border-[rgba(110,168,255,0.08)] transition-all"
            style={{ cursor: card.link ? 'pointer' : 'default' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}
              >
                <card.icon size={20} color={card.color} />
              </div>
              {card.link && <ArrowRight size={15} color="#555577" />}
            </div>
            <div className="font-[Plus_Jakarta_Sans] font-extrabold text-[36px] text-[#E8E8F0] leading-none mb-1.5">
              {card.value}
            </div>
            <div className="text-[#8888A8] text-sm font-semibold mb-1">{card.label}</div>
            <div className="text-[12px] font-semibold" style={{ color: card.color }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-5">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-[#0F0F1A] border border-[rgba(110,168,255,0.08)]"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <Activity size={17} color="#6EA8FF" />
            <h2 className="font-[Plus_Jakarta_Sans] font-bold text-base text-[#E8E8F0] m-0">Aktivitas Terbaru</h2>
          </div>
          <div className="flex flex-col">
            {recentActivity.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(110,168,255,0.06)' : 'none' }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: typeColor[act.type], boxShadow: `0 0 6px ${typeColor[act.type]}` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[#E8E8F0] text-[13px] font-semibold mb-0.5 truncate">{act.item}</div>
                  <div className="text-[#8888A8] text-[11px]">{act.action}</div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                    style={{ background: `${typeColor[act.type]}15`, color: typeColor[act.type] }}
                  >
                    {typeLabel[act.type]}
                  </span>
                  <span className="text-[#555577] text-[11px]">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-[#0F0F1A] border border-[rgba(110,168,255,0.08)]"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <Star size={17} color="#A78BFA" />
            <h2 className="font-[Plus_Jakarta_Sans] font-bold text-base text-[#E8E8F0] m-0">Aksi Cepat</h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              ...quickActions,
              { label: 'Lihat Website', to: '/', color: '#A78BFA', icon: Eye, external: true },
            ].map(item => (
              <Link key={item.label} to={item.to} target={item.external ? '_blank' : undefined} className="no-underline">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-[rgba(110,168,255,0.08)] bg-transparent hover:bg-[rgba(110,168,255,0.05)] transition-all cursor-pointer"
                >
                  <div
                    className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}12` }}
                  >
                    <item.icon size={16} color={item.color} />
                  </div>
                  <span className="text-[#C8C8E8] text-sm font-semibold">{item.label}</span>
                  <ArrowRight size={14} color="#555577" className="ml-auto" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}