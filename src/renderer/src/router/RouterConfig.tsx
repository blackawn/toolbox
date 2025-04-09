import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import RouterGuard from './RouterGuard'
import { PhVideo } from '@renderer/components/icon'
import Signin from '@renderer/views/Signin'
import VideoUrl from '@renderer/views/VideoUrl'
import Download from '@renderer/views/Download'

const menuList = [
  {
    path: 'live-data',
    element: <VideoUrl />,
    handle: {
      label: '获取视频地址',
      icon: <PhVideo className='size-6'/>
    }
  },
  {
    path: 'download',
    element: <Download />
  }
]

const config: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/download" />
  },
  {
    path: '/',
    element: <RouterGuard />,
    children: menuList
  },
  {
    path: 'signin',
    element: <Signin />
  }
]

export const routerConfig = createBrowserRouter(config)
export const menuData = menuList.filter((item)=> item.handle).map(({ element, ...item }) => item)
