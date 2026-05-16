import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle, Briefcase, User } from 'lucide-react'
import { contacts } from '../data/ContactData'
import { useServices } from '../hooks/useServices'

function InputBase({ focused, isDark }) {
  return `w-full px-4 py-3.5 rounded-xl border text-[15px] font-[Nunito] outline-none transition-all ${
    focused
      ? 'border-[#6EA8FF] shadow-[0_0_0_3px_rgba(110,168,255,0.1)]'
      : isDark ? 'border-[rgba(110,168,255,0.12)]' : 'border-[rgba(110,168,255,0.2)]'
  } ${
    focused
      ? isDark ? 'bg-[rgba(110,168,255,0.06)]' : 'bg-[rgba(110,168,255,0.05)]'
      : isDark ? 'bg-[rgba(255,255,255,0.03)]' : 'bg-[rgba(0,0,0,0.02)]'
  } ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`
}

export default function Contact({ isDark }) {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const { services, loading: servicesLoading, error: servicesError, retry } = useServices()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  const inputClass = (field) => InputBase({ focused: focused === field, isDark })

  return (
    <div className="pt-[100px]">
      <section className="px-8 pt-20 pb-32">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-[1fr_1.4fr] max-[900px]:grid-cols-1 gap-16 items-start">

            {/* ── Left Info ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(110,168,255,0.1)] border border-[rgba(110,168,255,0.25)] text-[#6EA8FF] text-[13px] font-semibold tracking-widest uppercase mb-6">
                Hubungi Kami
              </span>

              <h1 className={`font-[Plus_Jakarta_Sans] font-extrabold leading-[1.1] tracking-[-0.03em] text-[clamp(2rem,4vw,3.5rem)] mb-5 ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>
                Siap Memulai<br />
                <span className="bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] bg-clip-text text-transparent">
                  Perjalanan Digital
                </span>
                <br />Anda?
              </h1>

              <p className={`text-base leading-[1.75] mb-10 ${isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'}`}>
                Ceritakan proyek impian Anda kepada kami. Tim NOWA.IO akan segera menghubungi Anda dalam 24 jam untuk konsultasi gratis.
              </p>

              {/* Contact Items — dari contactData.js */}
              <div className="flex flex-col gap-4 mb-10">
                {contacts.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3.5"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: `${c.color}12`,
                        border: `1px solid ${c.color}25`,
                      }}
                    >
                      <c.icon size={18} color={c.color} />
                    </div>
                    <div>
                      <div className={`text-[12px] font-medium mb-0.5 ${isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'}`}>{c.label}</div>
                      <div className={`text-[15px] font-semibold ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>{c.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Form Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`p-10 rounded-[20px] border ${isDark ? 'bg-[#16161F] border-[rgba(110,168,255,0.12)]' : 'bg-white border-[rgba(110,168,255,0.2)]'}`}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)] mb-6"
                    >
                      <CheckCircle size={36} color="#4ADE80" />
                    </motion.div>
                    <h3 className={`font-[Plus_Jakarta_Sans] font-bold text-2xl mb-3 ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>
                      Pesan Terkirim! 🎉
                    </h3>
                    <p className={`text-sm leading-[1.7] mb-6 ${isDark ? 'text-[#8888A8]' : 'text-[#6060A0]'}`}>
                      Terima kasih telah menghubungi kami. Tim NOWA.IO akan segera merespons dalam 24 jam.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      onClick={() => setSent(false)}
                      className={`mt-6 px-7 py-3 rounded-xl border bg-transparent text-[#6EA8FF] text-sm font-semibold cursor-pointer font-[Nunito] ${isDark ? 'border-[rgba(110,168,255,0.12)]' : 'border-[rgba(110,168,255,0.2)]'}`}
                    >
                      Kirim Pesan Lagi
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <h2 className={`font-[Plus_Jakarta_Sans] font-bold text-[22px] mb-1 ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>
                      Ceritakan Proyek Anda
                    </h2>

                    {/* Name & Email */}
                    {[
                      { field: 'name', label: 'Nama Lengkap', placeholder: 'Budi Santoso', icon: User, type: 'text' },
                      { field: 'email', label: 'Email', placeholder: 'budi@perusahaan.com', icon: Mail, type: 'email' },
                    ].map(({ field, label, placeholder, icon: Icon, type }) => (
                      <div key={field}>
                        <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>{label}</label>
                        <div className="relative">
                          <input
                            type={type}
                            value={form[field]}
                            onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                            onFocus={() => setFocused(field)}
                            onBlur={() => setFocused(null)}
                            placeholder={placeholder}
                            required
                            className={`${inputClass(field)} pl-11`}
                          />
                          <Icon size={16} color="#8888A8" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    ))}

                    {/* Service Select — dari useServices hook */}
                    <div>
                      <label className={`flex items-center gap-1.5 font-semibold text-sm mb-2 ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>
                        <Briefcase size={14} /> Layanan yang Dibutuhkan
                      </label>

                      {servicesLoading ? (
                        <div className={`w-full px-4 py-3.5 rounded-xl border font-[Nunito] flex items-center gap-2 ${isDark ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(110,168,255,0.12)] text-[#8888A8]' : 'bg-[rgba(0,0,0,0.02)] border-[rgba(110,168,255,0.2)] text-[#6060A0]'}`}>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-[rgba(110,168,255,0.3)] border-t-[#6EA8FF] rounded-full flex-shrink-0"
                          />
                          <span className="text-sm">Memuat layanan...</span>
                        </div>
                      ) : servicesError ? (
                        <div className={`w-full px-4 py-3.5 rounded-xl border text-[13px] font-[Nunito] flex items-center justify-between gap-3 ${isDark ? 'bg-[rgba(255,100,100,0.05)] border-[rgba(255,100,100,0.2)] text-[#FF6B6B]' : 'bg-[rgba(255,100,100,0.04)] border-[rgba(255,100,100,0.2)] text-[#CC4444]'}`}>
                          <span className="truncate">{servicesError}</span>
                          <button
                            type="button"
                            onClick={retry}
                            className="text-[#6EA8FF] underline text-[13px] font-semibold cursor-pointer flex-shrink-0"
                          >
                            Coba lagi
                          </button>
                        </div>
                      ) : (
                        <select
                          value={form.service}
                          onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                          required
                          onFocus={() => setFocused('service')}
                          onBlur={() => setFocused(null)}
                          className={`${inputClass('service')} appearance-none`}
                        >
                          <option value="">Pilih layanan...</option>
                          {services.map((o) => (
                            <option key={o.id ?? o.value} value={o.id ?? o.value}>
                              {o.nama ?? o.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block font-semibold text-sm mb-2 ${isDark ? 'text-[#E8E8F0]' : 'text-[#1A1A2E]'}`}>Pesan</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        placeholder="Ceritakan lebih detail tentang proyek, kebutuhan, dan timeline Anda..."
                        required
                        rows={5}
                        className={`${inputClass('message')} resize-y`}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: loading ? 1 : 1.03, boxShadow: loading ? 'none' : '0 0 40px rgba(110,168,255,0.35)' }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      type="submit"
                      disabled={loading || servicesLoading}
                      className={`py-[15px] px-8 rounded-xl border-none text-white font-[Nunito] font-bold text-base flex items-center justify-center gap-2.5 transition-all ${
                        loading || servicesLoading
                          ? 'bg-[rgba(110,168,255,0.5)] cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] cursor-pointer'
                      }`}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-[18px] h-[18px] border-2 border-[rgba(255,255,255,0.3)] border-t-white rounded-full"
                          />
                          Mengirim...
                        </>
                      ) : (
                        <><Send size={18} /> Kirim Pesan</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}