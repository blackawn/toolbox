import texture from '@renderer/assets/texture.png'
import Aside from './Aside'
import Header from './Header'
import Main from './Main'

const Layout: React.FC<any> = () => {
  return (
    <div className='app-darg h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex'
    style={{
      backgroundImage: `url(${texture})`
    }}
    >
      <Aside/>
      <div className='flex-1 flex flex-col'>
        <Header/>
        <Main/>
      </div>
    </div>
  )
}

export default Layout
