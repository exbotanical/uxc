import { ApolloProvider } from '@apollo/client'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { useRoutes } from 'react-router-dom'

import { Routes } from '@/router'
import { client } from '@/services/api'
import './App.scss'
import { ThemeProvider } from '@/styles'

export function App() {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <ThemeProvider>
            <main>{useRoutes(Routes())}</main>
          </ThemeProvider>
        </AnimatePresence>
      </ApolloProvider>
    </HelmetProvider>
  )
}
