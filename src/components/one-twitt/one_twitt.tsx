import LoadingSpinner from "../loading-spinner/loading_spinner";
import Comment from "../comment/comment";
import Create_Comment from '../create-comment/create_comment';
import { useEffect } from 'react';
import { useTwittGlobalContext } from "../../hooks/context/twitts";
import { useUserGlobalContext } from "../../hooks/context/user";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './one_twitt.css';
import '../../style-variables/variables.css';

function One_Twitt() {

    const twittContext = useTwittGlobalContext();
    const userContext = useUserGlobalContext();
    const { user } = userContext;
    const params = useParams();
    const { twittId } = params;
    const navigate = useNavigate();
    const { fetchOneTwitt, oneTwitt, isLoading } = twittContext;
    const {image, image_url, favourites, commentsNumber, twitt, _id} = oneTwitt;

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
                <div className='loading-spinner-container'>
                    <LoadingSpinner />
                </div>

            }
            {!isLoading &&

                <div className="one-twitt-container">

                    <div className={`one-twitt-wrapper ${image ? 'one-twitt-wrapper-img' : '.one-twitt-wrapper-no-img'}`}>

                        <div className={`${image_url ? 'one-twitt-content-container' : 'one-twitt-content-container-no-img'}`}>

                            <div className="one-twitt-card-first-column-container">
                                <div className="one-twitt-user-avatar-container">
                                    <div className="one-twitt-card-avatar-container">
                                        <img src={oneTwitt.user.image_url} alt="" />
                                    </div>
                                </div>

                                <div className="one-twitt-card-username-container">
                                    <p>@{oneTwitt.user.username}</p>
                                    <>
                                        {
                                            oneTwitt.user._id == userContext.user._id || userContext.user.isAdmin == 1 &&
                                            <div className="delete-twitt-container">
                                                <i className='bx bx-trash delete-twitt'></i>
                                            </div>
                                        }
                                    </>

                                </div>



                            </div>
                            <div className={`${image ? 'one-twitt-card-second-column-container' : 'one-twitt-card-second-column-container-no-img'}`}>

                                <div className="one-twitt-info-container">
                                    <div className="one-twitt-desc-container">
                                        <p>{twitt}</p>
                                    </div>
                                </div>
                                {
                                    image &&
                                    <div className="one-twitt-card-img-container">
                                        <img src={image_url} alt="" />
                                    </div>
                                }
                            </div>
                            <div className="one-twitt-card-third-column-container">
                                <div className="icon-num-container">
                                    <>
                                        {
                                            user && user.favourites ?
                                                user.favourites.forEach(fav => fav == _id ? <i className='bx bxs-star full-star' ></i> : <i className='bx bx-star star' ></i>)
                                                :
                                                <i className='bx bx-star star' ></i>
                                        }
                                    </>
                                    <span>{favourites > 0 ? favourites : '0'}</span>
                                </div>
                                <div className="icon-num-container">
                                    <i className='bx bx-comment'></i>
                                    <span>{commentsNumber > 0 ? commentsNumber : '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='comments-container'>
                        <div>
                            {
                                userContext.user.username &&
                                <Create_Comment />
                            }
                        </div>

                        {
                            oneTwitt?.comments &&
                            oneTwitt.comments.map((item, i) => {
                                return (
                                    <Comment comment={item} key={i} />
                                )
                            })
                        }
                    </div>

                </div >
            }

        </>

    )
}

export default One_Twitt