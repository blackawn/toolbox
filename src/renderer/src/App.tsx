import { JSX } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routerConfig } from '@renderer/router'
import {
  ConfigProvider as AntdConfigProvider,
  App as AntdApp,
  theme as antdThemeConfig
} from 'antd'
import AntdFeedback from '@renderer/hooks/useAntdFeedback'
import PersonalizeProvider from './components/PersonalizeProvider'
import AntdThemeProvider from './components/AntdThemeProvider'

import zhCN from 'antd/locale/zh_CN'
// for date-picker i18n
import 'dayjs/locale/zh-cn'

function App(): JSX.Element {
  return (
    <PersonalizeProvider>
      {({ isDark, theme, color }) => (
        <AntdThemeProvider theme={theme} color={color}>
          {({ antdTheme }) => (
            <AntdConfigProvider
              theme={{
                ...antdTheme,
                hashed: false,
                algorithm: isDark ? antdThemeConfig.darkAlgorithm : antdThemeConfig.defaultAlgorithm
              }}
              locale={zhCN}
            >
              <AntdApp>
                <AntdFeedback />
                <RouterProvider router={routerConfig} />
              </AntdApp>
            </AntdConfigProvider>
          )}
        </AntdThemeProvider>
      )}
    </PersonalizeProvider>
  )
}

export default App
