import { useState, FormEvent, ChangeEvent } from "react";
import { useUserGlobalContext } from "../../hooks/context/user";
import { FormBtn } from "../form-btn/form_btn";
import '../login_form/form.css';
import { ErrorContainer } from "../error-container/error_container";


function User_Login() {

    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const { error, registerUser, registerError} = useUserGlobalContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!newUser.username || !newUser.email || newUser.password) {
            setIsInputEmpty(true);
        } else {
            setIsInputEmpty(false);
            const formData = new FormData();
            formData.append("email", newUser.email);
            formData.append("username", newUser.username);
            formData.append("password", newUser.password);
            if (file != null) {
                formData.append("image", file);
            };
            registerUser(formData);
        }
    }

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFile(file);
        }
    }

    return (
        <main className="user-login-main">
            <form className="login-form">
                {error && <p>{error}</p>}
                <div className="login-input-label-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className={`${isInputEmpty || error ? 'input-error' : ''}`} onChange={handleChange} value={newUser.email} />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" className={`${isInputEmpty || error ? 'input-error' : ''}`} onChange={handleChange} value={newUser.username} />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="file">Username</label>
                    <input type="file" name="file" onChange={handleUploadFile}  />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" className={`${isInputEmpty || error ? 'input-error' : ''}`} onChange={handleChange} value={newUser.password} />
                </div>
                {
                    registerError && <ErrorContainer message={"Error al crear el usuario, intente de nuevo"}/>
                }
                <FormBtn content={'Iniciar sesión'} handleClick={handleSubmit} additionalClassName={["login-btn"]} widthNum={70} />
            </form>
        </main>

    )
}

export default User_Login