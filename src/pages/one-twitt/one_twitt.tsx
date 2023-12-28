import LoadingSpinner from "../../components/loading-spinner/loading_spinner";
import { useEffect } from 'react';
import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../style-variables/variables.css';
import { Single_Twitt } from "../../components/single-twitt/single_twitt";

function One_Twitt() {

    const twittContext = useTwittGlobalContext();
    const params = useParams();
    const { twittId } = params;
    const navigate = useNavigate();
    const { fetchOneTwitt, isLoading } = twittContext;

    if (twittId) {
        useEffect(() => {
            fetchOneTwitt(twittId);
        }, [])
    } else {
        navigate('/home');
    }

    return (
        <>
            {
                isLoading &&
                    <LoadingSpinner />
            }
            {
                !isLoading &&
                    <Single_Twitt />
            }
        </>
    )
}

export default One_Twitt