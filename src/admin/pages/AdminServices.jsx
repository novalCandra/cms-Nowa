import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Modal, ConfirmDialog, Table, PageHeader, Field, Toast, useToast } from '../components/AdminUI'

const emptyForm = { nama: '', deskripsi: '' }

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const { toasts, show } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: emptyForm })

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://api-nowaio-production.up.railway.app/api/layanan')
      setServices(res.data.data)
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
    reset({ nama: item.nama, deskripsi: item.deskripsi })
    setModalOpen(true)
  }

  const onSubmit = async (formData) => {
    try {
      if (editItem) {
        await axios.put(`https://api-nowaio-production.up.railway.app/api/layanan/${editItem.id}`, formData)
        show('Layanan berhasil diperbarui ✓')
      } else {
        await axios.post('https://api-nowaio-production.up.railway.app/api/layanan', formData)
        show('Layanan berhasil ditambahkan ✓')
      }
      setModalOpen(false)
      fetchData()
    } catch {
      show('Gagal menyimpan', 'error')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await axios.delete(`https://api-nowaio-production.up.railway.app/api/layanan/${deleteItem.id}`)
      show('Layanan berhasil dihapus')
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
    { key: 'nama',     label: 'Nama',     render: (v) => <span className="font-bold text-[#6EA8FF]">{v}</span> },
    { key: 'deskripsi', label: 'Deskripsi', render: (v) => <span className="text-[#E8E8F0] max-w-[400px] block truncate">{v}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Manajemen Layanan"
        subtitle={`${services.length} layanan terdaftar`}
        action={
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-[Plus_Jakarta_Sans] font-bold text-sm cursor-pointer"
          >
            <Plus size={16} /> Tambah Layanan
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
        <Table columns={columns} data={services} onEdit={openEdit} onDelete={setDeleteItem} />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Layanan' : 'Tambah Layanan'} maxWidth={600}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <Field label="Nama Layanan" required>
            <input
              placeholder="Web Development"
              className={inputCls(errors.nama)}
              {...register('nama', { required: 'Nama wajib diisi' })}
            />
            {errors.nama && <p className={errStyle}>{errors.nama.message}</p>}
          </Field>

          <Field label="Deskripsi" required>
            <textarea
              rows={3}
              placeholder="Deskripsi layanan..."
              className={inputCls(errors.deskripsi)}
              style={{ resize: 'vertical' }}
              {...register('deskripsi', { required: 'Deskripsi wajib diisi' })}
            />
            {errors.deskripsi && <p className={errStyle}>{errors.deskripsi.message}</p>}
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
              type="submit"
              disabled={isSubmitting}
              className={`flex-[2] py-3 rounded-xl border-none text-white font-[Plus_Jakarta_Sans] font-bold text-sm flex items-center justify-center gap-2 ${
                isSubmitting ? 'bg-[rgba(110,168,255,0.4)] cursor-not-allowed' : 'bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] cursor-pointer'
              }`}
            >
              {isSubmitting && (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-[15px] h-[15px] border-2 border-[rgba(255,255,255,0.3)] border-t-white rounded-full" />
              )}
              {isSubmitting ? 'Menyimpan...' : editItem ? 'Simpan Perubahan' : 'Tambah Layanan'}
            </motion.button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Hapus Layanan"
        message={`Yakin ingin menghapus layanan "${deleteItem?.nama}"?`}
      />

      <Toast toasts={toasts} />
    </>
  )
}