import { useState, FormEvent } from "react"
import { useUserGlobalContext } from "../../hooks/context/user"
import './user_login.css'


function User_Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const {login, error} = useUserGlobalContext()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if(!email || !password) {
      setIsInputEmpty(true)
    } else {
      setIsInputEmpty(false)
      login(email, password)
    }

  }
 
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-label-container">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={`${isInputEmpty || error && 'input-empty'}`} onChange={e => setEmail(e.target.value) } value={email}/>
      </div>
      <div className="input-label-container">
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" className={`${isInputEmpty || error && 'input-empty'}`} onChange={e => setPassword(e.target.value)} value={password}/>
      </div>
      {error && <p>{error}</p>}
    </form>
  )
}

export default User_Login