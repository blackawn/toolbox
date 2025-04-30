import { createHashRouter, Navigate, type RouteObject } from 'react-router-dom'
import RouterGuard from './RouterGuard'
import { PhVideo } from '@renderer/components/icon'
import Signin from '@renderer/views/Signin'
import VideoUrl from '@renderer/views/VideoUrl'
import VideoConverter from '@renderer/views/VideoConverter'
import Setting from '@renderer/views/Setting'
import Download from '@renderer/views/Download'

const menuList = [
  {
    path: 'video-url',
    element: <VideoUrl />,
    handle: {
      label: '获取视频地址',
      icon: <PhVideo className="size-6" />
    }
  },
  {
    path: 'video-converter',
    element: <VideoConverter />,
    handle: {
      label: '视频转换',
      icon: <PhVideo className="size-6" />
    }
  },
  {
    path: 'setting',
    element: <Setting />
  },
  {
    path: 'download',
    element: <Download />
  }
]

const config: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/setting" />
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

export const routerConfig = createHashRouter(config)
export const menuData = menuList.filter((item) => item.handle).map(({ element, ...item }) => item)
