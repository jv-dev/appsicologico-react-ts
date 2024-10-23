import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import Psychologist from '../interfaces/Psychologist'

const AuthController = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const register = async (psychologist: Psychologist): Promise<void> => {
    try {
      await AuthService.register(psychologist)
      console.log('Cadastro realizado com sucesso!')
    } catch (error) {
      console.error('Erro no cadastro:', error)
      throw error
    }
  }

  const handleLogin = async (username: string, password: string) => {
    try {
      await AuthService.login(username, password)
      navigate('/patients')
    } catch (error: any) {
      setErrorMessage('Erro ao realizar o login. Verifique suas credenciais.')
    }
  }

  return {
    handleLogin,
    register,
    errorMessage,
  }
}

export default AuthController
