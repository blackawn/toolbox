import { menuData } from '@renderer/router/RouterConfig'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu as AntdMenu } from 'antd'

const Menu: React.FC<any> = () => {
  const navigate = useNavigate()

  console.log(123123);


  const menuItems = useMemo(() => {
    return menuData.map(({ path, handle }) => {
      return {
        label: handle?.label,
        key: path,
        icon: handle?.icon,
        onClick: () => {
          navigate(path)
        }
      }
    })
  }, [menuData, navigate])

  return (
    <div className="flex-1">
      <AntdMenu mode="inline" items={menuItems} />
    </div>
  )
}

export default Menu
