import { Globe, Briefcase, Newspaper, TrendingUp } from 'lucide-react'

export const staticStats = {
    services: 8,
    portfolio: 14,
    news: 22,
    publishedNews: 18,
    featuredPortfolio: 5,
    popularServices: 3,
}

export const getCards = (stats) => [
    { label: 'Total Layanan', value: stats.services, icon: Globe, color: '#6EA8FF', sub: `${stats.popularServices} Populer`, link: '/admin/services' },
    { label: 'Total Portofolio', value: stats.portfolio, icon: Briefcase, color: '#A78BFA', sub: `${stats.featuredPortfolio} Featured`, link: '/admin/portfolio' },
    { label: 'Total Berita', value: stats.news, icon: Newspaper, color: '#6EA8FF', sub: `${stats.publishedNews} Published`, link: '/admin/news' },
    { label: 'Engagement', value: '98%', icon: TrendingUp, color: '#A78BFA', sub: 'Tingkat kepuasan', link: null },
]

export const recentActivity = [
    { action: 'Layanan baru ditambahkan', item: 'Web Development', time: '2 jam lalu', type: 'create' },
    { action: 'Portofolio diperbarui', item: 'FinTrack Dashboard', time: '5 jam lalu', type: 'update' },
    { action: 'Berita dipublikasikan', item: 'Tren Web Design 2026', time: '1 hari lalu', type: 'publish' },
    { action: 'Layanan diperbarui', item: 'UI/UX Design', time: '2 hari lalu', type: 'update' },
    { action: 'Portofolio baru ditambahkan', item: 'MedCare App', time: '3 hari lalu', type: 'create' },
]

export const typeColor = { create: '#4ADE80', update: '#6EA8FF', publish: '#A78BFA' }
export const typeLabel = { create: 'Baru', update: 'Update', publish: 'Publish' }

export const quickActions = [
    { label: 'Tambah Layanan Baru', to: '/admin/services', color: '#6EA8FF', icon: Globe },
    { label: 'Upload Portofolio', to: '/admin/portfolio', color: '#A78BFA', icon: Briefcase },
    { label: 'Tulis Berita Baru', to: '/admin/news', color: '#6EA8FF', icon: Newspaper },
]