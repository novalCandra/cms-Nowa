import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const setToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `JWT ${token}`
            localStorage.setItem('nowa_admin_token', token)
        } else {
            delete axios.defaults.headers.common['Authorization']
            localStorage.removeItem('nowa_admin_token')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('nowa_admin_token')
        const savedUser = localStorage.getItem('nowa_admin_user')

        if (token && savedUser) {
            try {
                setToken(token)
                setUser(JSON.parse(savedUser))
            } catch {
                setToken(null)
                setUser(null)
                localStorage.removeItem('nowa_admin_user')
            }
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const res = await axios.post('https://api-nowaio-production.up.railway.app/api/auth/login', { email, password })
        setToken(res.data.token)
        setUser(res.data.data)
        localStorage.setItem('nowa_admin_user', JSON.stringify(res.data.data))
        return res.data
    }

    const logout = async () => {
        try { await axios.post('https://api-nowaio-production.up.railway.app/api/auth/logout') } catch { }
        setToken(null)
        setUser(null)
        localStorage.removeItem('nowa_admin_user')
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)