import texture from '@renderer/assets/texture.png'
import Aside from './Aside'
import Header from './Header'
import Main from './Main'
import { useEffect } from 'react'
import { notification } from '@renderer/hooks/useAntdFeedback'

const Layout: React.FC<any> = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('error', (_, error) => {
      notification.error({
        message: error.channel,
        description: error.message
      })
    })
  }, [])

  return (
    <div
      className="app-darg flex h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-800"
      style={{
        backgroundImage: `url(${texture})`
      }}
    >
      <Aside />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <Main />
      </div>
    </div>
  )
}

export default Layout
