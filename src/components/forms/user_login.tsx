import { useState, FormEvent  } from "react"
import { useUserGlobalContext } from "../../hooks/context/user"
import './user_login.css'


function User_Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const { login, error } = useUserGlobalContext()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setIsInputEmpty(true)
    } else {
      setIsInputEmpty(false)
      login(email, password)
    }

  }

  return (
    <main className="user-login-main">
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p>{error}</p>}
        <div className="input-label-container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className={`${isInputEmpty  || error  ? 'input-error' : ''}`} onChange={e => setEmail(e.target.value)} value={email} />
        </div>
        <div className="input-label-container">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" className={`${isInputEmpty  || error  ? 'input-error' : ''}`} onChange={e => setPassword(e.target.value)} value={password} />
        </div>
        <button type="submit" className="login-btn">Iniciar sesión</button>
      </form>
    </main>

  )
}

export default User_Login