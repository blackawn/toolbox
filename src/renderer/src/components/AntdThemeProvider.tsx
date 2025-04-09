import { getThemeConfig } from '@renderer/theme/antd-theme'
import { ThemeConfig } from 'antd'
import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'

interface AntdThemeContextProps {
  antdTheme: ThemeConfig
  setAntdTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>
}

interface AntdThemeProviderProps {
  children:
    | React.ReactNode
    | ((payload: Pick<AntdThemeContextProps, 'antdTheme'>) => React.ReactNode)
  theme?: Parameters<typeof getThemeConfig>[0]
  color?: string
}

export const AntdThemeContext = createContext<AntdThemeContextProps | undefined>(undefined)

export const PersonalizeProvider: React.FC<AntdThemeProviderProps> = ({
  children,
  theme,
  color,
  ...props
}) => {
  const [antdTheme, setAntdTheme] = useState<ThemeConfig>({})

  const value = {
    antdTheme,
    setAntdTheme
  }

  const renderChildren =
    typeof children === 'function'
      ? children({
          antdTheme
        })
      : children

  useEffect(() => {
    setAntdTheme({
      ...getThemeConfig(theme, color),
      token: {
        ...getThemeConfig(theme, color).token,
        colorPrimary: color
      }
    })
  }, [theme, color])

  return (
    <AntdThemeContext.Provider value={value} {...props}>
      {renderChildren}
    </AntdThemeContext.Provider>
  )
}

export default PersonalizeProvider

export const useAntdTheme = () => {
  const context = useContext(AntdThemeContext)

  if (context === undefined)
    throw new Error('usePersonalize must be used within a PersonalizeProvider')

  return context
}
