import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'

interface PersonalizeContextProps {
  theme: Theme
  color: string
  isDark: boolean
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  setColor: React.Dispatch<React.SetStateAction<string>>
}

interface PersonalizeProviderProps {
  children: React.ReactNode | ((data: PersonalizeContextProps) => React.ReactNode)
  defaultTheme?: Theme
  defaultColor?: string
  storageColorKey?: string
  storageThemeKey?: string
  onMounted?: () => void
}

export const PersonalizeContext = createContext<PersonalizeContextProps | undefined>(undefined)

const rootElement = window.document.documentElement

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const PersonalizeProvider: React.FC<PersonalizeProviderProps> = ({
  children,
  defaultTheme = 'system',
  defaultColor = '#737373',
  storageThemeKey = 'theme',
  storageColorKey = 'color',
  onMounted,
  ...props
}) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageThemeKey) as Theme) || defaultTheme
  )

  const [isDark, setIsDark] = useState(
    () =>
      localStorage[storageThemeKey] === 'dark' ||
      (!(storageThemeKey in localStorage) && mediaQuery.matches)
  )

  const [color, setColor] = useState<string>(
    () => (localStorage.getItem(storageColorKey) as string) || defaultColor
  )

  const value = {
    theme,
    color,
    setTheme,
    isDark,
    setColor
  }

  const renderChildren = typeof children === 'function' ? children(value) : children

  const modifyClass = () => {
    if (
      localStorage[storageThemeKey] === 'dark' ||
      (!(storageThemeKey in localStorage) && mediaQuery.matches)
    ) {
      setIsDark(true)
      rootElement.classList.add('dark')
    } else {
      setIsDark(false)
      rootElement.classList.remove('dark')
    }
  }

  const modifyThemeFromStorage = () => {
    const storageTheme = localStorage[storageThemeKey] as Theme
    if (['light', 'dark'].includes(storageTheme)) {
      setTheme(storageTheme)
    } else {
      setTheme('system')
    }
  }

  useEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem(storageThemeKey)
    } else if (['light', 'dark'].includes(theme)) {
      localStorage[storageThemeKey] = theme
    }

    modifyClass()
  }, [theme])

  useEffect(() => {
    localStorage[storageColorKey] = color
  }, [color])

  useLayoutEffect(() => {
    mediaQuery.addEventListener('change', modifyClass)

    window.addEventListener('storage', modifyThemeFromStorage)

    onMounted?.()

    return () => {
      mediaQuery.removeEventListener('change', modifyClass)

      window.removeEventListener('storage', modifyThemeFromStorage)
    }
  }, [])

  return (
    <PersonalizeContext.Provider value={value} {...props}>
      {renderChildren}
    </PersonalizeContext.Provider>
  )
}

export default PersonalizeProvider

export const usePersonalize = () => {
  const context = useContext(PersonalizeContext)

  if (context === undefined)
    throw new Error('usePersonalize must be used within a PersonalizeProvider')

  return context
}
