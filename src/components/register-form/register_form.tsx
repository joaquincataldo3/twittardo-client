import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useUserGlobalContext } from "../../hooks/context/user";
import { FormBtn } from "../form-btn/form_btn";
import '../login_form/form.css';
import { ErrorContainer } from "../error-container/error_container";
import { useLocation, useNavigate } from "react-router-dom";


function RegisterForm() {

    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);
    const [isUserUpdating, setIsUserUpdating] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const paramExists = searchParams.has('u');
    const paramValue = searchParams.get('u');
    const { registerUser, formError, user, updateUser } = useUserGlobalContext();

    useEffect(() => {
        authUser();
        verifyIfUserIsUpdating();
    }, [])

    // chequear si el usuario NO existe o está tratando de actualizar
    const authUser = () => {
        if ((user && !paramExists) || !user) {
            navigate('/home');
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!newUser.username || !newUser.email || !newUser.password) {
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
            if (isUserUpdating) {
                updateUser(formData);
            } else {
                registerUser(formData);
            }
        }
    };

    // verificar si el usuario está registrando o updateando
    const verifyIfUserIsUpdating = () => {
        if (paramExists && paramValue === '1') {
            setIsUserUpdating(true);
            setValuesIfUserUpdating();
        }
    }

    const setValuesIfUserUpdating = () => {
        setNewUser(prevUser => ({
            ...prevUser,
            email: user.email,
            username: user.username
        }));
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

                <div className="login-input-label-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className={`${isInputEmpty || formError ? 'input-error' : ''}`} onChange={handleChange} value={newUser.email} />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" className={`${isInputEmpty || formError ? 'input-error' : ''}`} onChange={handleChange} value={newUser.username} />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="file">Username</label>
                    <input type="file" name="file" onChange={handleUploadFile} />
                </div>
                {
                    !isUserUpdating &&
                    <div className="login-input-label-container">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" className={`${isInputEmpty || formError ? 'input-error' : ''}`} onChange={handleChange} value={newUser.password} />
                    </div>
                }
                {
                    formError && <ErrorContainer message={formError} />
                }
                <FormBtn content={isUserUpdating ? 'Actualizar' : 'Registrarse'} handleClick={handleSubmit} additionalClassName={["login-btn"]} widthNum={50} />
            </form>
        </main>

    )
}

export default RegisterForm