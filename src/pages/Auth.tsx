import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'
import AuthContainer from '../containers/AuthContainer'

const Auth = () => {
  const { instance, setAuth } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (instance.isAuth) {
      navigate('/messenger')
    }
  }, [instance])

  return (
    <div>
      <h1>Auth page</h1>
      <AuthContainer />
    </div>
  )
}

export default Auth
