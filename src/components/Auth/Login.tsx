import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService'
import { toast } from 'react-toastify'
import '../../styles/Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    if (!isValidEmail(email)) {
      toast.error('Por favor, insira um e-mail válido.')
      return
    }

    setIsLoading(true)

    try {
      const token = await AuthService.login(email, password)
      if (token) {
        localStorage.setItem('token', token)
        toast.success('Login realizado com sucesso!')
        navigate('/home');
      }
    } catch (error) {
      toast.error('Erro ao realizar login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
      </div>
    </div>
  )
}

export default Login
