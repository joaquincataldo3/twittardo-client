import { FormEvent, useState } from 'react';
import { CloseMenu } from '../close-menu/close_menu';
import { ConfirmDeleteTwittProps } from '../../utils/interfaces/props/props_interfaces';
import { FormBtn } from '../form-btn/form_btn';
import { useTwittGlobalContext } from '../../hooks/context/twitts';
import Black_Screen from '../black-screen/black_screen';
import LoadingSpinner from '../loading-spinner/loading_spinner';
import './confirm_twitt_delete.css';


export const ConfirmTwittDelete = (props: ConfirmDeleteTwittProps) => {

    const [isDeleteTwittPopupOpen, setIsDeleteTwittPopupOpen] = useState<boolean>(false);
    const { isTwittDeleteInProcess, handleDeleteTwitt, twittError} = useTwittGlobalContext();

    const { twittId } = props;

    const handlePopup = () => {
        setIsDeleteTwittPopupOpen(!isDeleteTwittPopupOpen);
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleDeleteTwitt(twittId);
    }

    return (
        <>
            {
                    <>
                        <Black_Screen state={isDeleteTwittPopupOpen} />
                        <div className="delete-twitt-icon-container">
                            <i className='bx bx-trash delete-twitt' onClick={handlePopup}></i>
                        </div>
                        <div className={`confirm-twitt-delete-container ${isDeleteTwittPopupOpen && 'confirm-twitt-delete-active'}`}>
                            <CloseMenu colorVar={'purple'} functionToHandle={handlePopup} />
                            {
                                isTwittDeleteInProcess && !twittError ?
                                <LoadingSpinner />
                                :
                                <div className='confirm-twitt-delete-subcontainer'>
                                <p>Seguro que querés eliminar el twitt</p>
                                <form className="confirm-twitt-delete-buttons-container">
                                    <FormBtn handleClick={(e: FormEvent) => handleFormSubmit(e)} content='Confirmar' widthNum={70} />
                                </form>
                            </div>
                            }
                        </div>
                    </>
            }

        </>
    )
}
