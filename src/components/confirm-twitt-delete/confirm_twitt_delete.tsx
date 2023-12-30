import { FormEvent, useState } from 'react';
import { CloseMenu } from '../close-menu/close_menu';
import { useNavigate } from 'react-router-dom';
import Black_Screen from '../black-screen/black_screen';
import axios from 'axios';
import './confirm_twitt_delete.css';
import LoadingSpinner from '../loading-spinner/loading_spinner';
import { ConfirmDeleteTwittProps } from '../../utils/interfaces/props/props_interfaces';
import { FormBtn } from '../form-btn/form_btn';


export const ConfirmTwittDelete = (props: ConfirmDeleteTwittProps) => {


    const [deleteTwittError, setDeleteTwittError] = useState<string>('');
    const [isProcessLoading, setIsProcessLoading] = useState<boolean>(false);
    const [isDeleteTwittPopupOpen, setIsDeleteTwittPopupOpen] = useState<boolean>(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { twittId } = props;

    const handleDeleteTwitt = async (e: FormEvent, idTwitt: string) => {
        e.preventDefault();
        setIsProcessLoading(true);
        const response = await axios.delete(`${apiUrl}/twitts/${idTwitt}/delete`);
        if (response.status !== 200) {
            setIsProcessLoading(false);
            setDeleteTwittError('Error al tratar de eliminar un twitt');
        } else {
            navigate('/home')
        }
    }

    
    const handlePopup = () => {
        setIsDeleteTwittPopupOpen(!isDeleteTwittPopupOpen);
    }

 
    return (
        <>
            <Black_Screen state={isDeleteTwittPopupOpen} />
            <div className="delete-twitt-icon-container">
                <i className='bx bx-trash delete-twitt' onClick={handlePopup}></i>
            </div>
            <div className={`confirm-twitt-delete-container ${isDeleteTwittPopupOpen && 'confirm-twitt-delete-active'}`}>
                <CloseMenu colorVar={'dark-blue'} functionToHandle={handlePopup} />
                {
                    !isProcessLoading && !deleteTwittError &&
                    <div className='confirm-twitt-delete'>
                        <p>Seguro que querés eliminar el twitt</p>
                        <form className="confirm-twitt-delete-buttons-container">
                            <div className="input-label-container">
                                <label htmlFor="confirm-delete">Si</label>
                                <input type="radio" name='confirm-twitt-delete' id='confirm-delete' value='1' />
                            </div>
                            <div className="input-label-container">
                                <label htmlFor="undo-delete">No</label>
                                <input type="radio" name='confirm-twitt-delete' id='undo-delete' value='0' />
                            </div>
                            <FormBtn handleClick={(e: FormEvent) => handleDeleteTwitt(e, twittId)} content='Confirmar' />
                        </form>
                    </div>
                }
                {
                    isProcessLoading && !deleteTwittError &&
                    <LoadingSpinner />
                }
            </div>
        </>
    )
}
