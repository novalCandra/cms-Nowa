import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import axios from 'axios'
import { Modal, ConfirmDialog, Table, PageHeader, Badge, Field, inputStyle, Toast, useToast } from '../components/AdminUI'

const emptyForm = { nama: '', deskripsi: '', imageUrl: '', link_portofolio: '' }

export default function AdminPortfolio() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteItem, setDeleteItem] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [focused, setFocused] = useState(null)
  const { toasts, show } = useToast()

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://api-nowaio-production.up.railway.app/api/portofolio')
      setData(res.data.data)
    } catch {
      show('Gagal memuat data', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const openCreate = () => { setEditItem(null); setForm(emptyForm); setModalOpen(true) }
  const openEdit = (item) => {
    setEditItem(item)
    setForm({
      nama: item.nama ?? '',
      deskripsi: item.deskripsi ?? '',
      imageUrl: item.imageUrl ?? '',
      link_portofolio: item.link_portofolio ?? '',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editItem) {
        await axios.put(`https://api-nowaio-production.up.railway.app/api/portofolio/${editItem.id}`, form)
        show('Portofolio berhasil diperbarui ✓')
      } else {
        await axios.post('https://api-nowaio-production.up.railway.app/api/portofolio', form)
        show('Portofolio berhasil ditambahkan ✓')
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
      await axios.delete(`https://api-nowaio-production.up.railway.app/api/portofolio/${deleteItem.id}`)
      show('Portofolio berhasil dihapus')
      setDeleteItem(null)
      fetchData()
    } catch {
      show('Gagal menghapus', 'error')
    } finally {
      setDeleting(false)
    }
  }

  const inp = (f) => ({
    ...inputStyle(focused, f, focused),
    onFocus: () => setFocused(f),
    onBlur: () => setFocused(null),
  })

  const columns = [
    { key: 'nama',     label: 'Nama',     render: (v) => <span className="font-bold text-[#6EA8FF]">{v}</span> },
    { key: 'deskripsi', label: 'Deskripsi', render: (v) => <span className="text-[#E8E8F0] max-w-[260px] block truncate">{v}</span> },
    {
      key: 'link_portofolio', label: 'Link', render: (v) => v
        ? <a href={v} target="_blank" rel="noopener noreferrer" className="text-[#6EA8FF] text-[12px] underline truncate max-w-[160px] block">{v}</a>
        : <span className="text-[#555577] text-[12px]">—</span>
    },
    {
      key: 'imageUrl', label: 'Gambar', render: (v) => v
        ? <img src={v} alt="thumb" className="w-10 h-10 rounded-lg object-cover border border-[rgba(110,168,255,0.15)]" onError={e => { e.currentTarget.style.display = 'none' }} />
        : <span className="text-[#555577] text-[12px]">—</span>
    },
  ]

  return (
    <>
      <PageHeader
        title="Manajemen Portofolio"
        subtitle={`${data.length} proyek terdaftar`}
        action={
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-none bg-gradient-to-r from-[#6EA8FF] to-[#A78BFA] text-white font-[Plus_Jakarta_Sans] font-bold text-sm cursor-pointer"
          >
            <Plus size={16} /> Tambah Proyek
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Proyek' : 'Tambah Proyek'} maxWidth={580}>
        <form onSubmit={handleSave} className="flex flex-col gap-4">

          <Field label="Nama Proyek" required>
            <input
              value={form.nama}
              onChange={e => setForm(p => ({ ...p, nama: e.target.value }))}
              required
              placeholder="FinTrack Dashboard"
              style={inp('nama')}
            />
          </Field>

          <Field label="Deskripsi" required>
            <textarea
              value={form.deskripsi}
              onChange={e => setForm(p => ({ ...p, deskripsi: e.target.value }))}
              required
              rows={3}
              placeholder="Deskripsi singkat proyek..."
              style={{ ...inp('deskripsi'), resize: 'vertical' }}
            />
          </Field>

          <Field label="URL Gambar" required>
            <input
              value={form.imageUrl}
              onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
              placeholder="https://example.com/gambar.jpg"
              style={inp('imageUrl')}
            />
            {form.imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden h-36 border border-[rgba(110,168,255,0.15)]">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.parentElement.style.display = 'none' }}
                />
              </div>
            )}
          </Field>

          <Field label="Link Portofolio" required>
            <input
              value={form.link_portofolio}
              onChange={e => setForm(p => ({ ...p, link_portofolio: e.target.value }))}
              placeholder="https://example.com/project"
              style={inp('link_portofolio')}
            />
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
              {saving ? 'Menyimpan...' : editItem ? 'Simpan Perubahan' : 'Tambah Proyek'}
            </motion.button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Hapus Proyek"
        message={`Yakin ingin menghapus proyek "${deleteItem?.nama}"?`}
      />

      <Toast toasts={toasts} />
    </>
  )
}