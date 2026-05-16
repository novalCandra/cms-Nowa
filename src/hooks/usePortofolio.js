import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'https://api-nowaio-production.up.railway.app'

const PortfolioCache = {
    data: null,
    promise: null,
    listeners: new Set(),

    subscribe(setter) {
        this.listeners.add(setter)
        return () => this.listeners.delete(setter)
    },

    broadcast(data) {
        this.listeners.forEach((setter) => setter(data))
    },

    async fetch(force = false) {
        if (this.data && !force) {
            this.broadcast({ ok: true, data: this.data })
            return
        }

        if (this.promise) {
            return this.promise
        }

        this.promise = axios
            .get(`${API_BASE_URL}/api/portofolio`)
            .then((res) => {
                this.data = res.data.data
                this.promise = null
                this.broadcast({ ok: true, data: this.data })
            })
            .catch((err) => {
                this.promise = null
                const message = err.response
                    ? `Server error: ${err.response.status} ${err.response.statusText}`
                    : 'Tidak dapat terhubung ke server. Pastikan API sudah berjalan.'
                this.broadcast({ ok: false, error: message })
            })

        return this.promise
    },

    retry() {
        this.data = null
        this.promise = null
        this.listeners.forEach((setter) => setter({ ok: null }))
        this.fetch(true)
    },
}

export function usePortfolio() {
    const [state, setState] = useState(() =>
        PortfolioCache.data
            ? { projects: PortfolioCache.data, loading: false, error: null }
            : { projects: [], loading: true, error: null }
    )

    useEffect(() => {
        const unsubscribe = PortfolioCache.subscribe((result) => {
            if (result.ok === true) {
                setState({ projects: result.data, loading: false, error: null })
            } else if (result.ok === false) {
                setState({ projects: [], loading: false, error: result.error })
            } else {
                setState({ projects: [], loading: true, error: null })
            }
        })

        PortfolioCache.fetch()

        return unsubscribe
    }, [])

    const retry = () => PortfolioCache.retry()

    return { ...state, retry }
}