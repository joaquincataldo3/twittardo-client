import { useEffect, useState } from "react";
import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useUserGlobalContext } from "../../hooks/context/user"
import { TwittCardProps } from "../../utils/interfaces/props/props_interfaces";
import LoadingSpinner from "../loading-spinner/loading_spinner";
import './comment_and_fav.css';

export const CommentAndFav = (props: TwittCardProps) => {

    const { user } = useUserGlobalContext();
    const { twitt } = props;
    const twittId = twitt._id;
    const { favTwitt, undoFav, isFavLoading } = useTwittGlobalContext();
    console.log(twitt)
    

    const handleFavItem = () => {
        if (twitt._id && user._id) {
            favTwitt(twitt._id, user._id);
        }
    }

    const handleUnfavItem = () => {
        if (twitt._id && user._id) {
            undoFav(twitt._id, user._id);
        }
    }

    const isFavorited = user.favourites.some(favourite => favourite._id === twittId);

    useEffect(() => {
        isFavorited
    }, [])

    return (
        <div className="fav-comment-container">
            {
                isFavLoading ?
                    <LoadingSpinner />
                    :
                    <>
                        <div className="icon-num-container">
                            <>
                                {isFavorited ? (
                                    <i className='bx bxs-star full-star' onClick={handleUnfavItem}></i>
                                ) : (
                                    <i className='bx bx-star star' onClick={handleFavItem}></i>
                                )}
                            </>
                            <p>{twitt.favourites > 0 ? twitt.favourites : '0'}</p>
                        </div>
                        <div className="icon-num-container">
                            <i className='bx bx-comment'></i>
                            <p>{twitt.comments.length > 0 ? `${twitt.comments.length}` : '0'}</p>
                        </div>
                    </>
            }

        </div>
    )
}
