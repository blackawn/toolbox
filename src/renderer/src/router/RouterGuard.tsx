import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const LazyLayout = lazy(() => import('@renderer/layout'))

const token = true

export default function RouterGuard() {
  return token ? <LazyLayout /> : <Navigate to="signin" />
}
