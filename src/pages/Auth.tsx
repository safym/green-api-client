import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'
import AuthForm from '../containers/AuthForm'

const Auth = () => {
  const { instance, setAuth } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (instance.isAuth) {
      navigate('/chat')
    }
  }, [instance])

  return (
    <div>
      <h1>Auth page</h1>
      <AuthForm />
    </div>
  )
}

export default Auth
