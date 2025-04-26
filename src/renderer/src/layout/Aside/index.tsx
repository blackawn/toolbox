import AppAction from './component/AppAction'
import Menu from './component/Menu'

const Aside: React.FC<any> = () => {
  return (
    <aside className="no-app-darg flex w-54 flex-col p-4">
      <div className="h-12"></div>
      <Menu />
      <AppAction />
    </aside>
  )
}

export default Aside
