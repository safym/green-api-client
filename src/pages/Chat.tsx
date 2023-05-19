import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'

const Chat = () => {
  const { instance, setAuth } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (!instance.isAuth) {
      navigate('/')
    }
  }, [instance])


  return (
    <div>
      <h1>Chat page</h1>
    </div>
  )
}

export default Chat
