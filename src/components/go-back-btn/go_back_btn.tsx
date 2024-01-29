
import {  useNavigate } from 'react-router-dom';
import { useUserGlobalContext } from '../../hooks/context/user';

const GoBackBtn = () => {

    const navigate = useNavigate();
    const {previousLocation} = useUserGlobalContext();

    const handleGoBack = () => {
        if(previousLocation) {
            navigate(previousLocation);
        }
    };

    return (
        <>
            {
                previousLocation &&
                <button onClick={handleGoBack}><i className='bx bx-chevron-left'></i></button>
            }
        </>
    );
};

export default GoBackBtn;