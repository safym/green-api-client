import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'
import MessengerContainer from '../containers/MessengerContainer'

const Messenger = () => {
  const { instance, setAuth } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (!instance.isAuth) {
      navigate('/')
    }
  }, [instance])


  return (
    <div>
      <h1>Messenger page</h1>
      <MessengerContainer />
    </div>
  )
}

export default Messenger
