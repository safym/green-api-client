import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Instance, AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'
import { getStateInstance } from '../api/api'

const AuthForm: React.FC = () => {
  // Данные instance контекста авторизации
  const { instance, setAuth } = useContext(AuthContext) as AuthContextType
  // Данные формы
  const [formData, setFormData] = useState<Instance>({
    idInstance: '',
    token: '',
    isAuth: false,
  })
  // Состояние для управления запросами к api в useEffect
  const [formIsSubmit, setformIsSubmit] = useState<boolean>(false)
  // Хук для навигации при авторизации
  const navigate = useNavigate()

  // Обработчик ввода для input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevCount) => ({
      ...prevCount,
      [name]: value,
    }))
  }

  // Обработчик submit для form
  const handleSubmit = async (e: React.FormEvent) => {
    setformIsSubmit(true)
    e.preventDefault()

    setAuth(formData)

    setFormData({ idInstance: '', token: '', isAuth: false })
  }

  // Выполнение запроса к апи с данными для авторизации и обработка результата
  useEffect(() => {
    if (!formIsSubmit) return

    const fetchApi = async () => {
      if (!instance.idInstance || !instance.token) return

      const response = await getStateInstance(instance)

      console.log(response)

      switch (response.stateInstance) {
        case 'authorized':
          setAuth({ ...instance, isAuth: true })
          navigate('/chat')
          break
        default:
          setAuth({ ...instance, isAuth: false })
      }

      setformIsSubmit(false)
    }

    fetchApi()
  }, [instance])

  return (
    <div>
      <p>ID: {instance.idInstance}</p>
      <p>Token: {instance.token}</p>
      <p>IsAuth: {instance.isAuth ? 'true' : 'false'}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="idInstance"
          value={formData.idInstance}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="token"
          value={formData.token}
          onChange={handleInputChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default AuthForm
