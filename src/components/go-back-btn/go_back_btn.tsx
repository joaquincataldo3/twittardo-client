import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoBackBtn = () => {
    const [previousPath, setPreviousPath] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setPreviousPath(previousPath);
        };
      }, [location]);

    const handleGoBack = () => {
        navigate(previousPath);
    };

    console.log(previousPath)

    return (
        <>
            {
                previousPath &&
                <button onClick={handleGoBack}><i className='bx bx-chevron-left'></i></button>
            }
        </>
    );
};

export default GoBackBtn;