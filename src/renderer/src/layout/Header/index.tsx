import WindowAction from './component/WindowAction'

const Header: React.FC<any> = () => {
  return (
    <header className="flex">
      <div className="flex-1"></div>
      <WindowAction />
    </header>
  )
}

export default Header
