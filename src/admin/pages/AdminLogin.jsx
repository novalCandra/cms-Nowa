import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import logoNowaDark from '../../assets/logo-nowa-dark.png'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ mode: 'onTouched' })

  const emailVal = watch('email', '')
  const passwordVal = watch('password', '')

  const onSubmit = async (data) => {
    setServerError('')
    try {
      await login(data.email, data.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login gagal, coba lagi')
    }
  }

  const inputClass = (fieldName) => {
    const hasError = !!errors[fieldName]
    return `w-full py-3.5 pl-11 pr-4 rounded-xl border text-[15px] font-[Nunito] outline-none transition-all text-[#E8E8F0] ${
      hasError
        ? 'border-[rgba(239,68,68,0.5)] bg-[rgba(239,68,68,0.04)] shadow-[0_0_0_3px_rgba(239,68,68,0.08)]'
        : 'border-[rgba(110,168,255,0.15)] bg-[rgba(255,255,255,0.03)] focus:border-[#6EA8FF] focus:bg-[rgba(110,168,255,0.05)] focus:shadow-[0_0_0_3px_rgba(110,168,255,0.12)]'
    }`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08080F] px-8 relative overflow-hidden">
      {/* Orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6EA8FF, transparent 70%)', filter: 'blur(80px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #A78BFA, transparent 70%)', filter: 'blur(80px)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] relative z-[1] bg-[rgba(16,16,26,0.9)] border border-[rgba(110,168,255,0.15)] rounded-3xl p-10 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
      >
        {/* Logo + Badge */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <motion.img
            whileHover={{ scale: 1.04 }}
            src={logoNowaDark}
            alt="NOWA"
            className="h-12 w-auto object-contain"
          />
          <div className="w-px h-3 bg-[rgba(110,168,255,0.2)]" />
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(110,168,255,0.08)] border border-[rgba(110,168,255,0.18)]">
            <Lock size={10} color="#6EA8FF" />
            <span className="text-[#6EA8FF] text-[10px] font-bold tracking-[0.12em] uppercase">
              Admin Panel
            </span>
          </div>
          <div className="text-center mt-1">
            <h1 className="font-[Plus_Jakarta_Sans] font-extrabold text-[24px] text-[#E8E8F0] tracking-[-0.5px] m-0">
              Selamat Datang
            </h1>
          </div>
        </div>

        {/* Server Error */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-[#FCA5A5] text-[13px]"
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

          {/* Email */}
          <div>
            <label className="block text-[#A0A0C0] text-[13px] font-semibold mb-2">Email</label>
            <div className="relative">
              <User size={16} color={errors.email ? '#EF4444' : '#6EA8FF'} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                autoComplete="email"
                className={inputClass('email')}
                {...register('email', {
                  required: 'Email wajib diisi',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Format email tidak valid',
                  },
                })}
              />
            </div>
            {/* Pesan error email */}
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[12px] text-[#FCA5A5] flex items-center gap-1"
                >
                  <AlertCircle size={11} className="flex-shrink-0" />
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#A0A0C0] text-[13px] font-semibold mb-2">Password</label>
            <div className="relative">
              <Lock size={16} color={errors.password ? '#EF4444' : '#6EA8FF'} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`${inputClass('password')} pr-11`}
                {...register('password', {
                  required: 'Password wajib diisi',
                  minLength: {
                    value: 6,
                    message: 'Password minimal 6 karakter',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#8888A8] p-0"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Pesan error password */}
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 text-[12px] text-[#FCA5A5] flex items-center gap-1"
                >
                  <AlertCircle size={11} className="flex-shrink-0" />
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.03, boxShadow: isSubmitting ? 'none' : '0 0 40px rgba(110,168,255,0.4)' }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className={`mt-1 py-3.5 rounded-xl border-none text-white font-[Plus_Jakarta_Sans] font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              isSubmitting ? 'bg-[rgba(110,168,255,0.4)] cursor-not-allowed' : 'bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] cursor-pointer'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-[18px] h-[18px] border-[2.5px] border-[rgba(255,255,255,0.3)] border-t-white rounded-full"
                />
                Masuk...
              </>
            ) : 'Masuk ke Dashboard'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}