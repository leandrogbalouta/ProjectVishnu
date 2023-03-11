import { useState, useEffect, FC, ReactNode } from 'react'
import ThemeContext from './themeContext'

const ThemeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('')

  const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }

  useEffect(() => {
    if (theme === 'light') document.body.classList.remove('dark')
    else document.body.classList.add('dark')
  }, [theme])

  return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider