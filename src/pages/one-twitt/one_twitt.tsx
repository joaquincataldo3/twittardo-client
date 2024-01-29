import LoadingSpinner from "../../components/loading-spinner/loading_spinner";
import { useEffect } from 'react';
import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useParams } from "react-router-dom";
import '../../style-variables/variables.css';
import { Single_Twitt } from "../../components/single-twitt/single_twitt";
import GoBackBtn from "../../components/go-back-btn/go_back_btn";

function One_Twitt() {

    const twittContext = useTwittGlobalContext();
    const fetchSingleTwitt = twittContext?.fetchOneTwitt;
    const isLoading = twittContext?.isFavLoading;
    const params = useParams();
    const { twittId } = params;

    if (twittId && fetchSingleTwitt) {
        try {
            useEffect(() => {
                fetchSingleTwitt(twittId);
            }, [])
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            {
                isLoading &&
                <LoadingSpinner />
            }
            {
                !isLoading &&
                <>
                    <GoBackBtn />
                    <Single_Twitt />
                </>
            }
        </>
    )
}

export default One_Twitt;