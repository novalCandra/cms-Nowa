import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle, XCircle, Pencil, Trash2 } from 'lucide-react'

// Modal
export function Modal({ open, onClose, title, children, maxWidth = 560 }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(0,0,0,0.75)] z-[200] backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-h-[90vh] overflow-y-auto bg-[#0F0F1A] rounded-[20px] border border-[rgba(110,168,255,0.15)] shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
              style={{ maxWidth }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(110,168,255,0.08)]">
                <h2 className="font-[Plus_Jakarta_Sans] font-bold text-[18px] text-[#E8E8F0] m-0">{title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg border border-[rgba(110,168,255,0.15)] bg-[rgba(110,168,255,0.06)] cursor-pointer flex items-center justify-center text-[#8888A8] transition-all"
                >
                  <X size={16} />
                </motion.button>
              </div>
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Confirm Dialog
export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth={400}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center">
          <AlertTriangle size={26} color="#EF4444" />
        </div>
        <p className="text-[#8888A8] text-sm leading-[1.65]">{message}</p>
        <div className="flex gap-2.5 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-[rgba(110,168,255,0.15)] bg-[rgba(110,168,255,0.05)] text-[#8888A8] font-[Nunito] font-semibold text-sm cursor-pointer"
          >
            Batal
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onConfirm} disabled={loading}
            className={`flex-1 py-3 rounded-xl border-none text-white font-[Nunito] font-bold text-sm flex items-center justify-center gap-1.5 ${
              loading ? 'bg-[rgba(239,68,68,0.4)] cursor-not-allowed' : 'bg-gradient-to-r from-[#EF4444] to-[#F97316] cursor-pointer'
            }`}
          >
            {loading && (
              <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity }}
                className="w-[15px] h-[15px] border-2 border-[rgba(255,255,255,0.3)] border-t-white rounded-full"
              />
            )}
            {loading ? 'Menghapus...' : 'Hapus'}
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}

// Toast
export function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            className={`flex items-center gap-2.5 px-[18px] py-3 rounded-xl min-w-[240px] max-w-[340px] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] border ${
              t.type === 'success'
                ? 'bg-[rgba(74,222,128,0.1)] border-[rgba(74,222,128,0.25)]'
                : 'bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.25)]'
            }`}
          >
            {t.type === 'success'
              ? <CheckCircle size={17} color="#4ADE80" />
              : <XCircle size={17} color="#EF4444" />}
            <span className={`text-[13px] font-semibold font-[Nunito] ${t.type === 'success' ? 'text-[#4ADE80]' : 'text-[#FCA5A5]'}`}>
              {t.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// useToast hook
export function useToast() {
  const [toasts, setToasts] = useState([])
  const show = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }, [])
  return { toasts, show }
}

// Form Field
export function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#A0A0C0] text-[13px] font-semibold">
        {label}{required && <span className="text-[#6EA8FF] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

export const inputStyle = (focused, field, focusedField) => ({
  padding: '11px 14px', borderRadius: 10,
  border: `1.5px solid ${focusedField === field ? '#6EA8FF' : 'rgba(110,168,255,0.12)'}`,
  background: focusedField === field ? 'rgba(110,168,255,0.05)' : 'rgba(255,255,255,0.02)',
  color: '#E8E8F0', fontSize: 14, fontFamily: 'Nunito, sans-serif',
  outline: 'none', width: '100%', transition: 'all 0.2s',
  boxShadow: focusedField === field ? '0 0 0 3px rgba(110,168,255,0.1)' : 'none',
})

// Badge
export function Badge({ children, color = '#6EA8FF' }) {
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
      style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
    >
      {children}
    </span>
  )
}

// Table
export function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[rgba(110,168,255,0.08)]">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[rgba(110,168,255,0.05)] border-b border-[rgba(110,168,255,0.08)]">
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3.5 text-left text-[#8888A8] text-[12px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3.5 text-right text-[#8888A8] text-[12px] font-bold tracking-[0.06em] uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-[rgba(110,168,255,0.06)] hover:bg-[rgba(110,168,255,0.03)] transition-colors"
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3.5 text-[#E8E8F0] text-sm align-middle">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(row)}
                      className="px-3.5 py-1.5 rounded-lg border border-[rgba(110,168,255,0.2)] bg-[rgba(110,168,255,0.08)] text-[#6EA8FF] text-[12px] font-bold cursor-pointer font-[Nunito]"
                    >
                      <Pencil size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(row)}
                      className="px-3.5 py-1.5 rounded-lg border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.08)] text-[#F87171] text-[12px] font-bold cursor-pointer font-[Nunito]"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="py-12 text-center text-[#555577] text-sm">
                Belum ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// Page Header
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
      <div>
        <h1 className="font-[Plus_Jakarta_Sans] font-extrabold text-[26px] text-[#E8E8F0] mb-1.5 tracking-[-0.3px]">{title}</h1>
        {subtitle && <p className="text-[#8888A8] text-sm">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}