import { useState, FormEvent  } from "react"
import { useUserGlobalContext } from "../../hooks/context/user"
import { FormBtn } from "../form-btn/form_btn"
import './form.css'
import { ErrorContainer } from "../error-container/error_container"


function User_Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const { login, formError } = useUserGlobalContext()

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
      <form className="login-form">
        <div className="login-input-label-container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className={`${isInputEmpty  || formError  ? 'input-error' : ''}`} onChange={e => setEmail(e.target.value)} value={email} />
        </div>
        <div className="login-input-label-container">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" className={`${isInputEmpty  || formError  ? 'input-error' : ''}`} onChange={e => setPassword(e.target.value)} value={password} />
        </div>
        { formError && <ErrorContainer message={formError} /> }
        <FormBtn content={'Iniciar sesión'} handleClick={handleSubmit} additionalClassName={["login-btn"]} widthNum={70}/>
      </form>
    </main>

  )
}

export default User_Login