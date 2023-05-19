import React, { createContext, useState } from 'react'

import { Instance, AuthContextType } from '../@types/auth'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<any> = ({ children }) => {
  const [instance, setInstance] = useState<Instance>({
    idInstance: '',
    token: '',
    isAuth: false,
  })

  const setAuth = (data: Instance) => {
    setInstance(data)
  }

  const contextValue: AuthContextType = {
    instance,
    setAuth,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
