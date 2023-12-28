import { useState } from 'react';
import './confirm_twitt_delete.css';
import Black_Screen from '../black-screen/black_screen';
import { CloseMenu } from '../close-menu/close_menu';

export const ConfirmTwittDelete = () => {

    const [isConfirmTwittDeleteActive, setIsConfirmTwittDeleteActive] = useState<boolean>(false);

    const handleClickDeleteTwitt = () => {
        setIsConfirmTwittDeleteActive(prevState => !prevState);
    }

    return (
        <div className='delete-twitt-container'>
            <div className="delete-twitt-icon-container">
                <i className='bx bx-trash delete-twitt' onClick={handleClickDeleteTwitt}></i>
            </div>
            <Black_Screen state={isConfirmTwittDeleteActive} />
            <div className={`confirm-twitt-delete-container ${isConfirmTwittDeleteActive && 'confirm-twitt-delete-active'}`}>
                <CloseMenu colorVar={'dark-blue'} functionToHandle={handleClickDeleteTwitt} />
            </div>
        </div>
    )
}
