import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../../@types/auth'
import { AuthContext } from '../../context/AuthProvider'
import AuthContainer from '../../containers/Auth/AuthContainer'

import styles from "./Auth.module.scss"
import { ImWhatsapp } from 'react-icons/im';

const Auth = () => {
  const { instance } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (instance.isAuth) {
      navigate('/messenger')
    }
  }, [instance])

  return (
    <div className={styles.auth}>
      <div className={styles.logoWrapper}>
        <ImWhatsapp className={styles.logo}/>
        <h1 className={styles.logoTitle}>GREEN API</h1>
      </div>
      <h1 className={styles.title}>Авторизация</h1>
      <AuthContainer />
    </div>
  )
}

export default Auth
