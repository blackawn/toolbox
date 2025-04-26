import texture from '@renderer/assets/texture.png'
import Aside from './Aside'
import Header from './Header'
import Main from './Main'

const Layout: React.FC<any> = () => {
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
