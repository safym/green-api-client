import React, { useContext, useState, useEffect } from 'react'

import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'


const MessengerContainer: React.FC = () => {
  // Данные instance контекста авторизации
  const { instance, setAuth } = useContext(AuthContext) as AuthContextType


  return (
    <div>
      <p>MessengerContainer</p>
    </div>
  )
}

export default MessengerContainer
