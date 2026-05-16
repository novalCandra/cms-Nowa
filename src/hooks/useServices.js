import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'https://api-nowaio-production.up.railway.app'

let cachedServices = null
let fetchPromise = null

export function useServices() {
    const [services, setServices] = useState(cachedServices ?? [])
    const [loading, setLoading] = useState(cachedServices === null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (cachedServices !== null) {
            setServices(cachedServices)
            setLoading(false)
            return
        }

        if (!fetchPromise) {
            fetchPromise = axios
                .get(`${API_BASE_URL}/api/layanan`)
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
                cachedServices = data
                setServices(data)
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
        cachedServices = null
        fetchPromise = null
        setLoading(true)
        setError(null)

        fetchPromise = axios
            .get(`${API_BASE_URL}/api/layanan`)
            .then((res) => res.data.data)
            .catch((err) => {
                fetchPromise = null
                throw err
            })

        fetchPromise
            .then((data) => {
                cachedServices = data
                setServices(data)
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

    return { services, loading, error, retry }
}