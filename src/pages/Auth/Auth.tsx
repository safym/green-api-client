import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../../@types/auth'
import { AuthContext } from '../../context/AuthProvider'
import AuthContainer from '../../containers/AuthContainer/AuthContainer'

import { ImWhatsapp } from 'react-icons/im';

import styles from "./Auth.module.scss"

const Auth: React.FC = () => {
  const { instance } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  // Навигация на /messenger, если пользователь авторизован
  useEffect(() => {
    if (instance.isAuth) {
      navigate('/messenger')
    }
  }, [instance])

  return (
    <div className={styles.auth}>
      <div className={styles.logoWrapper}>
        <ImWhatsapp className={styles.logo}/>
      </div>
      <h1 className={styles.title}>Log In</h1>
      <AuthContainer />
    </div>
  )
}

export default Auth
