import React, { useContext, useState, useEffect } from 'react'

import { Instance, AuthContextType } from '../../@types/auth'

import { getStateInstance } from '../../api/api'

import { AuthContext } from '../../context/AuthProvider'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { cleanSpecialChar } from '../../utils/cleanSpecialChar'
import { setLocalStorageItem } from '../../utils/setLocalStorageItem'
import { getLocalStorageItem } from '../../utils/getLocalStorageItem'

import styles from './AuthContainer.module.scss'

const AuthContainer: React.FC = () => {
  // Данные instance контекста авторизации
  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  // Данные формы
  const [formData, setFormData] = useState<Instance>({
    idInstance: '',
    token: '',
    isAuth: false,
  })
  // Состояние для управления запросами к api в useEffect
  const [formIsSubmit, setformIsSubmit] = useState<boolean>(false)
  // Состояние ошибки при авторизации
  const [error, setError] = useState<boolean>(false)
  // Состояние процесса выполнения запроса
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Обработчик ввода для input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const clearValue = cleanSpecialChar(value)

    setFormData((prevData) => ({
      ...prevData,
      [name]: clearValue,
    }))

    if (error) setError(false)
  }

  // Обработчик submit для form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setformIsSubmit(true)
    setInstance(formData)
    setFormData({ idInstance: '', token: '', isAuth: false })
  }

  // Выполнение запроса к api с данными для авторизации и обработка результата
  useEffect(() => {
    if (!formIsSubmit) return

    const fetchApi = async () => {
      setIsLoading(true)

      if (!instance.idInstance || !instance.token) return

      const response = await getStateInstance(instance)

      if (response && response.stateInstance === 'authorized') {
        const newInstance = { ...instance, isAuth: true }

        setInstance(newInstance)
        setLocalStorageItem('instance', newInstance)
        setError(false)
      } else {
        setInstance({ ...instance, isAuth: false })
        setError(true)
      }

      setIsLoading(false)
    }

    fetchApi()

    setformIsSubmit(false)
  }, [instance])

  // Загрузка данных авторизации, если они есть в LocalStorage
  useEffect(() => {
    const instanceDataString = getLocalStorageItem('instance')

    if (instanceDataString) {
      const instanceData = JSON.parse(instanceDataString)

      setInstance({ ...instanceData })
    }
  }, [])

  return (
    <>
      {/* Для отладки */}
      {/* <p>ID: {instance.idInstance}</p>
      <p>Token: {instance.token}</p>
      <p>IsAuth: {instance.isAuth ? 'true' : 'false'}</p> */}

      {error && <p className={styles.error}>Authorization error</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          name="idInstance"
          value={formData.idInstance}
          onChange={handleInputChange}
          placeholder="Instance ID"
          required
        />
        <Input
          type="text"
          name="token"
          value={formData.token}
          onChange={handleInputChange}
          placeholder="API Token"
          required
        />
        <Button type={'submit'} isLoading={isLoading}>
          Login
        </Button>
        <p className={styles.register}>
          Not registered?{' '}
          <a className={styles.link} href="https://console.green-api.com/auth/register" target="_blank">
            Create an account
          </a>
        </p>
      </form>
    </>
  )
}

export default AuthContainer
