import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'https://api-nowaio-production.up.railway.app'

let cachedNews = null
let fetchPromise = null

export function useNews() {
    const [news, setNews] = useState(cachedNews ?? [])
    const [loading, setLoading] = useState(cachedNews === null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (cachedNews !== null) {
            setNews(cachedNews)
            setLoading(false)
            return
        }

        if (!fetchPromise) {
            fetchPromise = axios
                .get(`${API_BASE_URL}/api/berita`)
                .then((res) => res.data.data)
                .catch((err) => {
                    fetchPromise = null
                    throw err
                })
        }

        setLoading(true)
        setError(null)

        fetchPromise
            .then((data) => {
                cachedNews = data
                setNews(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(
                    err.response
                        ? `Server error: ${err.response.status} ${err.response.statusText}`
                        : 'Tidak dapat terhubung ke server. Pastikan API sudah berjalan.'
                )
                setLoading(false)
            })
    }, [])

    const retry = () => {
        cachedNews = null
        fetchPromise = null
        setLoading(true)
        setError(null)

        fetchPromise = axios
            .get(`${API_BASE_URL}/api/berita`)
            .then((res) => res.data.data)
            .catch((err) => {
                fetchPromise = null
                throw err
            })

        fetchPromise
            .then((data) => {
                cachedNews = data
                setNews(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(
                    err.response
                        ? `Server error: ${err.response.status} ${err.response.statusText}`
                        : 'Tidak dapat terhubung ke server. Pastikan API sudah berjalan.'
                )
                setLoading(false)
            })
    }

    return { news, loading, error, retry }
}

export function useNewsDetail(id) {
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return

        setLoading(true)
        setError(null)
        setArticle(null)

        axios
            .get(`${API_BASE_URL}/api/berita/${id}`)
            .then((res) => {
                setArticle(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(
                    err.response
                        ? `Server error: ${err.response.status} ${err.response.statusText}`
                        : 'Gagal memuat detail berita.'
                )
                setLoading(false)
            })
    }, [id])

    return { article, loading, error }
}