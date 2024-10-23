import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '../../services/AuthService'
import '../../styles/Register.css'

const Register: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [crp, setCrp] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidCrp = (crp: string) => {
    const crpRegex = /^\d{5,10}$/
    return crpRegex.test(crp)
  }

  const isValidPassword = (password: string) => {
    return password.length >= 6
  }

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !crp) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    if (!isValidEmail(email)) {
      toast.error('Por favor, insira um email válido.')
      return
    }

    if (!isValidPassword(password)) {
      toast.error('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    if (!isValidCrp(crp)) {
      toast.error('O CRP deve ser um número com 5 a 10 dígitos.')
      return
    }

    setIsLoading(true)

    try {
      await AuthService.register({ name, email, password, phone, crp, cpf })
      toast.success('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch (error) {
      toast.error('Erro ao realizar cadastro. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Cadastro Psicólogo</h2>
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="CRP (Registro Profissional)"
          value={crp}
          onChange={(e) => setCrp(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Cadastrar'}
        </button>
        <p>Já tem uma conta? <a href="/login">Entre aqui</a></p>
      </div>
    </div>
  )
}

export default Register
