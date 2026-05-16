import { useState, useEffect } from 'react'

export function useDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('nowa-theme')
        if (stored) return stored === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        const root = document.documentElement
        if (isDark) {
            root.classList.remove('light')
            root.classList.add('dark')
            document.body.classList.remove('light')
        } else {
            root.classList.remove('dark')
            root.classList.add('light')
            document.body.classList.add('light')
        }
        localStorage.setItem('nowa-theme', isDark ? 'dark' : 'light')
    }, [isDark])

    return [isDark, setIsDark]
}