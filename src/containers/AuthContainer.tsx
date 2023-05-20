import React, { useContext, useState, useEffect } from 'react'

import { Instance, AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'
import { getStateInstance } from '../api/api'
import { cleanSpecialChar } from '../utils/cleanSpecialChar'
import Input from '../components/Input'
import Button from '../components/Button'
import { setLocalStorageItem } from '../utils/setLocalStorageItem'

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

    setFormData((prevCount) => ({
      ...prevCount,
      [name]: clearValue,
    }))
  }

  // Обработчик submit для form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setformIsSubmit(true)
    setInstance(formData)
    setFormData({ idInstance: '', token: '', isAuth: false })
  }

  // Выполнение запроса к апи с данными для авторизации и обработка результата
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

  useEffect(() => {
    const instanceDataString = localStorage.getItem('instance')

    if (instanceDataString) {
      const instanceData = JSON.parse(instanceDataString)

      setInstance({ ...instanceData })
    }
  }, [])

  return (
    <>
      <p>ID: {instance.idInstance}</p>
      <p>Token: {instance.token}</p>
      <p>IsAuth: {instance.isAuth ? 'true' : 'false'}</p>
      <p>{error && 'Ошибка авторизации'}</p>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="idInstance"
          value={formData.idInstance}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="token"
          value={formData.token}
          onChange={handleInputChange}
          required
        />
        <Button type={'submit'}>{isLoading ? 'Loading...' : 'Login'}</Button>
      </form>
    </>
  )
}

export default AuthContainer
