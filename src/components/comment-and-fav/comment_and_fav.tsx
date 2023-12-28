import { useEffect, useState } from "react";
import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useUserGlobalContext } from "../../hooks/context/user"
import { TwittCardProps } from "../../types";
import LoadingSpinner from "../loading-spinner/loading_spinner";
import './comment_and_fav.css';
import { fetchTwittActions } from "../../utils/utils";

export const CommentAndFav = (props: TwittCardProps) => {

    const { user } = useUserGlobalContext();
    const { twitt } = props;
    const { favTwitt, undoFav, isFavLoading, fetchTwitts} = useTwittGlobalContext();
    const [isLocalFavLoading, setLocalFavLoading] = useState<boolean>(false);


    const handleFavItem = () => {
        console.log(twitt._id, user._id)
        if (twitt._id && user._id) {
            setLocalFavLoading(true);
            favTwitt(twitt._id, user._id);
            fetchTwitts(fetchTwittActions.RELOAD);
        }
    }

    const handleUnfavItem = () => {
        if (twitt._id && user._id) {
            setLocalFavLoading(true);
            undoFav(twitt._id, user._id);
            fetchTwitts(fetchTwittActions.RELOAD);
        }
    }

    useEffect(() => {
        if (isFavLoading === isLocalFavLoading && isLocalFavLoading) {
            setLocalFavLoading(false);
        }
    }, [isFavLoading, isLocalFavLoading]);

    return (
        <div className="fav-comment-container">
            {
                isLocalFavLoading ?
                    <LoadingSpinner />
                    :
                    <>
                        <div className="icon-num-container">
                            <>
                                {
                                    user.favourites.includes(twitt._id) ?
                                        <i key={twitt._id} className='bx bxs-star full-star' onClick={handleUnfavItem}></i> :
                                        <i className='bx bx-star star' onClick={handleFavItem}></i>
                                }
                            </>
                            <p>{twitt.favourites > 0 ? twitt.favourites : '0'}</p>
                        </div>
                        <div className="icon-num-container">
                            <i className='bx bx-comment'></i>
                            <p>{twitt.commentsNumber > 0 ? twitt.commentsNumber : '0'}</p>
                        </div>
                    </>
            }

        </div>
    )
}
