import React from 'react'
import { Navigate } from 'react-router-dom'

import { Join } from '@/components/Auth/Join'
import { Signin } from '@/components/Auth/Signin'
import { Wrapper } from '@/components/Auth/Wrapper'
import { ConnectedMainLayout as MainLayout } from '@/components/Layout/MainLayout'
import { PrivateThreadsList } from '@/components/PrivateThread'

import { withProtectedRoute } from './ProtectedRoute'

import type { RouteObject } from 'react-router-dom'

const WrappedLayout = withProtectedRoute(MainLayout)

/** @todo error boundaries */
export function Routes(): RouteObject[] {
  return [
    {
      element: <Wrapper content={<Signin />} />,
      path: '/signin',
    },
    {
      element: <Wrapper content={<Join />} />,
      path: '/join',
    },
    {
      element: <WrappedLayout />,
      path: '/*',

      children: [
        {
          element: <PrivateThreadsList />,
          path: '/*',
        },
        {
          element: <PrivateThreadsList />,
          path: ':threadId',
        },
      ],
    },
    {
      element: <Navigate to="/signin" />,
      path: '*',
    },
  ]
}
