import { Outlet } from 'react-router-dom'

const Main: React.FC<any> = () => {
  return (
    <main className="no-app-darg flex-1 px-4 pt-2 pb-4">
      <div className="h-full rounded-xl bg-neutral-50 dark:bg-neutral-700/50 p-4 ">
        <Outlet />
      </div>
    </main>
  )
}

export default Main
