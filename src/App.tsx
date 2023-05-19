import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthProvider'
import Layout from './pages/Layout'
import Auth from './pages/Auth'
import Chat from './pages/Chat'

const App: React.FC = () => {
  return (
    <main className="App">
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Auth />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </main>
  )
}

export default App
