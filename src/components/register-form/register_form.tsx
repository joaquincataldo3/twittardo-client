import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useUserGlobalContext } from "../../hooks/context/user";
import { FormBtn } from "../form-btn/form_btn";
import { ErrorContainer } from "../error-container/error_container";
import { useLocation, useNavigate } from "react-router-dom";
import '../login_form/form.css';
import { UserAvatar } from "../user-avatar/user_avatar";
import { UserRegisterFormData, UserRegisterValidationErrors } from "../../utils/interfaces/entities/entities_interfaces";
import LoadingSpinner from "../loading-spinner/loading_spinner";


function RegisterForm() {

    const [newUser, setNewUser] = useState<UserRegisterFormData>({
        email: '',
        username: ''
    });
    const [userPassword, setUserPassword] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<UserRegisterValidationErrors>({
        email: false,
        username: false,
        password: false
    })
    const [file, setFile] = useState<File | null>(null);
    const [isUserUpdating, setIsUserUpdating] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const paramExists = searchParams.has('u');
    const paramValue = searchParams.get('u');
    const { registerUser, formError, user, updateUser } = useUserGlobalContext();
    const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsUserLoading(true);
        authUser();
        verifyIfUserIsUpdating();
        setIsUserLoading(false);
    }, [user])

    // chequear si el usuario NO existe o está tratando de actualizar
    const authUser = () => {
        if ((user && !paramExists) || !user) {
            console.log('entro 2')
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

    const handlePasswordText = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    }

    const validateInputs = (): boolean => {
        let hasValidationError: boolean = false;
        if (newUser.email.trim() === '') {
            validationErrors.email = true;
        } else if (newUser.username.trim() === '') {
            validationErrors.username = true;
        }
        if (!isUserUpdating) {
            if (newUser.username.trim() === '') {
                validationErrors.password = true;
            }
        }
        return hasValidationError;
    }

    const setFormData = (): FormData => {
        let formData = new FormData();
        formData.append("email", newUser.email);
        formData.append("username", newUser.username);
        formData.append("password", userPassword);
        if (file != null) {
            formData.append("image", file);
        };
        return formData;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setValidationErrors((prevUser) => ({
            ...prevUser,
            email: false,
            username: false,
            password: false
        }));
        const hasValidationError = validateInputs();
        if (!hasValidationError) {
            const formData = setFormData();
            if (isUserUpdating && user._id) {
                updateUser(formData, user._id);
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
        <>
        {
            isUserLoading ? 
            <LoadingSpinner />
            :
            <main className="user-login-main">
            <form className="login-form">

                <div className="login-input-label-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className={`${validationErrors.email && 'input-error'}`} onChange={handleChange} value={newUser.email} />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" className={`${validationErrors.username && 'input-error'}`} onChange={handleChange} value={newUser.username} />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="username">{isUserUpdating ? 'Imagen actual' : 'Avatar'}</label>
                    {
                        isUserUpdating &&
                        <div className="current-img-container">
                            <UserAvatar url={user.image.secure_url} width={100} height={90} />
                        </div>
                    }
                    <input type="file" name="file" onChange={handleUploadFile} className="upload-img" />
                </div>
                <div className="login-input-label-container">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" className={`${validationErrors.password && 'input-error'}`} onChange={handlePasswordText} value={userPassword} />
                    {
                        isUserUpdating &&
                        <p className="disclaimer-register">En el caso de dejar vacío, se toman los datos actuales actual</p>
                    }
                </div>
                {
                    formError && <ErrorContainer message={formError} />
                }
                <FormBtn content={isUserUpdating ? 'Actualizar' : 'Registrarse'} handleClick={handleSubmit} additionalClassName={["login-btn"]} widthNum={50} />
            </form>
        </main>
        }
        </>
        
        

    )
}

export default RegisterForm