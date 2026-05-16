import { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, Briefcase, Newspaper,
  LogOut, Menu, X,
  ChevronRight, ChevronLeft, User, LayoutDashboard
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import logoNowaDark from '../assets/logo-nowa-dark.png'



// SidebarContent
function SidebarContent({ collapsed = false, mobile = false, onClose, onToggleCollapse, user, onLogout }) {
  const isExpanded = !collapsed || mobile

  return (
    <div className="flex flex-col h-full">

      {/* Logo area */}
      <div className={`border-b border-[rgba(110,168,255,0.08)] mb-2 ${isExpanded ? 'px-5 py-5' : 'py-5 px-0'}`}>
        {isExpanded ? (
          <div className="flex items-center justify-between">
            <img src={logoNowaDark} alt="NOWA" className="h-25 w-auto" />
            {!mobile && (
              <button
                onClick={onToggleCollapse}
                className="bg-transparent border-none text-[#8888A8] hover:text-[#6EA8FF] cursor-pointer p-1 rounded-md transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {mobile && (
              <button
                onClick={onClose}
                className="bg-transparent border-none text-[#8888A8] hover:text-[#E8E8F0] cursor-pointer p-1 rounded-md"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onToggleCollapse}
              className="bg-transparent border-none text-[#6EA8FF] cursor-pointer p-1"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Section label */}
      {isExpanded && (
        <div className="px-5 py-1 mb-1 text-[10px] font-bold tracking-[0.1em] text-[#555577] uppercase">
          Menu
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 flex flex-col gap-0.5">

        <NavLink
          to="/admin/dashboard"
          onClick={mobile ? onClose : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl border no-underline font-[Nunito] font-semibold text-sm transition-all ${
              isExpanded ? 'px-3.5 py-3' : 'px-0 py-3 justify-center'
            } ${
              isActive
                ? 'bg-gradient-to-r from-[rgba(110,168,255,0.15)] to-[rgba(167,139,250,0.08)] border-[rgba(110,168,255,0.2)] text-[#6EA8FF]'
                : 'border-transparent text-[#8888A8] hover:bg-[rgba(110,168,255,0.05)] hover:text-[#C8C8E8]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard size={18} color={isActive ? '#6EA8FF' : '#8888A8'} />
              {isExpanded && <span>Dashboard</span>}
              {isActive && isExpanded && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6EA8FF]" />}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/layanan"
          onClick={mobile ? onClose : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl border no-underline font-[Nunito] font-semibold text-sm transition-all ${
              isExpanded ? 'px-3.5 py-3' : 'px-0 py-3 justify-center'
            } ${
              isActive
                ? 'bg-gradient-to-r from-[rgba(110,168,255,0.15)] to-[rgba(167,139,250,0.08)] border-[rgba(110,168,255,0.2)] text-[#6EA8FF]'
                : 'border-transparent text-[#8888A8] hover:bg-[rgba(110,168,255,0.05)] hover:text-[#C8C8E8]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Globe size={18} color={isActive ? '#6EA8FF' : '#8888A8'} />
              {isExpanded && <span>Layanan</span>}
              {isActive && isExpanded && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6EA8FF]" />}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/portofolio"
          onClick={mobile ? onClose : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl border no-underline font-[Nunito] font-semibold text-sm transition-all ${
              isExpanded ? 'px-3.5 py-3' : 'px-0 py-3 justify-center'
            } ${
              isActive
                ? 'bg-gradient-to-r from-[rgba(110,168,255,0.15)] to-[rgba(167,139,250,0.08)] border-[rgba(110,168,255,0.2)] text-[#6EA8FF]'
                : 'border-transparent text-[#8888A8] hover:bg-[rgba(110,168,255,0.05)] hover:text-[#C8C8E8]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Briefcase size={18} color={isActive ? '#6EA8FF' : '#8888A8'} />
              {isExpanded && <span>Portofolio</span>}
              {isActive && isExpanded && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6EA8FF]" />}
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/berita"
          onClick={mobile ? onClose : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl border no-underline font-[Nunito] font-semibold text-sm transition-all ${
              isExpanded ? 'px-3.5 py-3' : 'px-0 py-3 justify-center'
            } ${
              isActive
                ? 'bg-gradient-to-r from-[rgba(110,168,255,0.15)] to-[rgba(167,139,250,0.08)] border-[rgba(110,168,255,0.2)] text-[#6EA8FF]'
                : 'border-transparent text-[#8888A8] hover:bg-[rgba(110,168,255,0.05)] hover:text-[#C8C8E8]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Newspaper size={18} color={isActive ? '#6EA8FF' : '#8888A8'} />
              {isExpanded && <span>Berita</span>}
              {isActive && isExpanded && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6EA8FF]" />}
            </>
          )}
        </NavLink>

      </nav>

      {/* User info + Logout */}
      <div className="px-2 pt-3 pb-3 border-t border-[rgba(110,168,255,0.08)]">
        {isExpanded && (
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[rgba(110,168,255,0.05)] mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6EA8FF] to-[#A78BFA] flex items-center justify-center flex-shrink-0">
              <User size={16} color="#fff" />
            </div>
            <div>
              <div className="text-[#E8E8F0] text-[13px] font-bold">{user?.name}</div>
              <div className="text-[#6EA8FF] text-[11px] font-medium">Administrator</div>
            </div>
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onLogout}
          className={`w-full flex items-center gap-2.5 rounded-xl border border-[rgba(239,68,68,0.15)] bg-[rgba(239,68,68,0.06)] text-[#F87171] font-[Nunito] font-semibold text-sm cursor-pointer transition-all hover:bg-[rgba(239,68,68,0.12)] ${
            isExpanded ? 'px-3.5 py-3 justify-start' : 'py-3 justify-center'
          }`}
        >
          <LogOut size={17} />
          {isExpanded && 'Keluar'}
        </motion.button>
      </div>
    </div>
  )
}

// AdminLayout
export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#08080F]">

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex flex-shrink-0 h-screen sticky top-0 bg-[#0F0F1A] border-r border-[rgba(110,168,255,0.08)] flex-col overflow-hidden"
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(prev => !prev)}
          user={user}
          onLogout={handleLogout}
        />
      </motion.aside>

      {/* Mobile Overlay + Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-[100] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#0F0F1A] z-[101] border-r border-[rgba(110,168,255,0.1)]"
            >
              <SidebarContent
                mobile
                user={user}
                onClose={() => setMobileOpen(false)}
                onLogout={handleLogout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar (mobile only) */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-[#0F0F1A] border-b border-[rgba(110,168,255,0.08)] sticky top-0 z-50">
          <img src="/logo-dark.svg" alt="NOWA" className="h-[30px]" />
          <button
            onClick={() => setMobileOpen(true)}
            className="bg-transparent border-none text-[#E8E8F0] cursor-pointer"
          >
            <Menu size={22} />
          </button>
        </div>

        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}