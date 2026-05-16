import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Modal, ConfirmDialog, Table, PageHeader, Field, Toast, useToast } from '../components/AdminUI'

const emptyForm = {
  judul: '',
  deskripsi: '',
  imageUrl: '',
  tanggal: '',
}

const URL_REGEX = /^(https?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/

export default function AdminNews() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { toasts, show } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({ defaultValues: emptyForm })

  const imageUrlValue = watch('imageUrl')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://api-nowaio-production.up.railway.app/api/berita')
      setData(res.data.data)
    } catch {
      show('Gagal memuat data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const openCreate = () => {
    setEditItem(null)
    reset(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditItem(item)
    reset({
      judul: item.judul ?? '',
      deskripsi: item.deskripsi ?? '',
      imageUrl: item.imageUrl ?? '',
      tanggal: item.tanggal ?? '',
    })
    setModalOpen(true)
  }

  const onSubmit = async (formData) => {
    setSaving(true)
    try {
      if (editItem) {
        await axios.put(`https://api-nowaio-production.up.railway.app/api/berita/${editItem.id}`, formData)
        show('Berita berhasil diperbarui ✓')
      } else {
        await axios.post('https://api-nowaio-production.up.railway.app/api/berita', formData)
        show('Berita berhasil ditambahkan ✓')
      }
      setModalOpen(false)
      fetchData()
    } catch {
      show('Gagal menyimpan', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await axios.delete(`https://api-nowaio-production.up.railway.app/api/berita/${deleteItem.id}`)
      show('Berita berhasil dihapus')
      setDeleteItem(null)
      fetchData()
    } catch {
      show('Gagal menghapus', 'error')
    } finally {
      setDeleting(false)
    }
  }

  const errStyle = 'mt-1 text-[11px] text-[#FCA5A5]'
  const inputCls = (hasErr) =>
    `w-full px-3.5 py-2.5 rounded-xl border text-[13px] text-[#E8E8F0] bg-[rgba(255,255,255,0.03)] outline-none transition-all font-[Nunito] ${
      hasErr
        ? 'border-[rgba(239,68,68,0.5)] focus:border-[#EF4444]'
        : 'border-[rgba(110,168,255,0.15)] focus:border-[#6EA8FF] focus:shadow-[0_0_0_3px_rgba(110,168,255,0.1)]'
    }`

  const columns = [
    { key: 'judul',    label: 'Judul',    render: (v) => <span className="font-bold text-[#6EA8FF] max-w-[280px] block truncate">{v}</span> },
    { key: 'deskripsi', label: 'Deskripsi', render: (v) => <span className="text-[#E8E8F0] max-w-[260px] block truncate">{v}</span> },
    {
      key: 'imageUrl', label: 'Gambar', render: (v) => v
        ? <img src={v} alt="thumb" className="w-10 h-10 rounded-lg object-cover border border-[rgba(110,168,255,0.15)]" onError={e => { e.currentTarget.style.display = 'none' }} />
        : <span className="text-[#555577] text-[12px]">—</span>
    },
    { key: 'tanggal',  label: 'Tanggal',  render: (v) => <span className="text-[#8888A8] text-[13px]">{v}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Manajemen Berita"
        subtitle={`${data.length} artikel terdaftar`}
        action={
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-[Plus_Jakarta_Sans] font-bold text-sm cursor-pointer"
          >
            <Plus size={16} /> Tulis Berita
          </motion.button>
        }
      />

      {loading ? (
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[52px] rounded-xl bg-[#1E1E2E] animate-pulse" />
          ))}
        </div>
      ) : (
        <Table columns={columns} data={data} onEdit={openEdit} onDelete={setDeleteItem} />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Berita' : 'Tulis Berita Baru'} maxWidth={620}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <Field label="Judul Berita" required>
            <input
              {...register('judul', {
                required: 'Judul berita wajib diisi',
                minLength: { value: 5, message: 'Judul minimal 5 karakter' },
                maxLength: { value: 150, message: 'Judul maksimal 150 karakter' },
              })}
              placeholder="Judul artikel yang menarik..."
              className={inputCls(errors.judul)}
            />
            {errors.judul && <p className={errStyle}>{errors.judul.message}</p>}
          </Field>

          <Field label="Deskripsi" required>
            <textarea
              {...register('deskripsi', {
                required: 'Deskripsi berita wajib diisi',
                minLength: { value: 10, message: 'Deskripsi minimal 10 karakter' },
                maxLength: { value: 1000, message: 'Deskripsi maksimal 1000 karakter' },
              })}
              rows={3}
              placeholder="Deskripsi singkat berita..."
              className={inputCls(errors.deskripsi)}
              style={{ resize: 'vertical' }}
            />
            {errors.deskripsi && <p className={errStyle}>{errors.deskripsi.message}</p>}
          </Field>

          <Field label="URL Gambar" required>
            <input
              {...register('imageUrl', {
                required: 'Gambar Berita wajib diisi',
                validate: (val) =>
                  !val || URL_REGEX.test(val) || 'URL gambar tidak valid (harus diawali https://)',
              })}
              placeholder="https://example.com/gambar-berita.jpg"
              className={inputCls(errors.imageUrl)}
            />
            {errors.imageUrl && <p className={errStyle}>{errors.imageUrl.message}</p>}
            {imageUrlValue && URL_REGEX.test(imageUrlValue) && (
              <div className="mt-2 rounded-xl overflow-hidden h-36 border border-[rgba(110,168,255,0.15)]">
                <img
                  src={imageUrlValue}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
                />
              </div>
            )}
          </Field>

          <Field label="Tanggal" required>
            <input
              type="date"
              {...register('tanggal', {
                required: 'Tanggal berita wajib diisi',
                validate: (val) => {
                  const selected = new Date(val)
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return selected <= today || 'Tanggal tidak boleh di masa depan'
                },
              })}
              className={inputCls(errors.tanggal)}
            />
            {errors.tanggal && <p className={errStyle}>{errors.tanggal.message}</p>}
          </Field>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 py-3 rounded-xl border border-[rgba(110,168,255,0.15)] bg-transparent text-[#8888A8] font-[Nunito] font-semibold cursor-pointer"
            >
              Batal
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              type="submit" disabled={saving}
              className={`flex-[2] py-3 rounded-xl border-none text-white font-[Plus_Jakarta_Sans] font-bold text-sm flex items-center justify-center gap-2 ${
                saving ? 'bg-[rgba(110,168,255,0.4)] cursor-not-allowed' : 'bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] cursor-pointer'
              }`}
            >
              {saving && (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-[15px] h-[15px] border-2 border-[rgba(255,255,255,0.3)] border-t-white rounded-full" />
              )}
              {saving ? 'Menyimpan...' : editItem ? 'Simpan Perubahan' : 'Publikasikan'}
            </motion.button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Hapus Berita"
        message={`Yakin ingin menghapus "${deleteItem?.judul}"?`}
      />

      <Toast toasts={toasts} />
    </>
  )
}