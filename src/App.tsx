import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthProvider'
import Layout from './pages/Layout/Layout'
import Auth from './pages/Auth/Auth'
import Messenger from './pages/Messenger'

const App: React.FC = () => {
  return (
    <main className="App">
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Auth />} />
              <Route path="/messenger" element={<Messenger />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </main>
  )
}

export default App
