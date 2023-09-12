import { useEffect } from 'react'
import { useTwittGlobalContext } from "../../hooks/context/twitts"
import { useUserGlobalContext } from "../../hooks/context/user"
import LoadingSpinner from "../loading-spinner/loading_spinner"
import Comment from "../comment/comment"
import '../../style-variables/variables.css'
import './one_twitt.css'
import { useParams } from "react-router-dom"
import Create_Comment from '../create-comment/create_comment'

function One_Twitt() {

    const twittContext = useTwittGlobalContext();
    const {fetchOneTwitt, oneTwitt} = twittContext;
    let {isLoading} = twittContext;
    const userContext = useUserGlobalContext();
    const {user} = userContext;
    const params = useParams().twittId!

    useEffect(() => {
        fetchOneTwitt(params);
    })


    return (

        <>

            {
                isLoading && <LoadingSpinner />
            }
            {!isLoading && twittContext &&
                <div className="one-twitt-container">

                    <div className={`one-twitt-wrapper ${oneTwitt.image ? 'one-twitt-wrapper-img' : '.one-twitt-wrapper-no-img'}`}>

                        <div className={`${oneTwitt.image_url ? 'one-twitt-content-container' : 'one-twitt-content-container-no-img'}`}>

                            <div className="one-twitt-card-first-column-container">
                                <div className="one-twitt-user-avatar-container">
                                    <div className="one-twitt-card-avatar-container">
                                        <img src={user.image_url} alt="" />
                                    </div>

                                    <div className="one-twitt-card-username-container">
                                        <p>@{oneTwitt.user.username}</p>
                                    </div>
                                </div>
                                <>
                                    {
                                        oneTwitt.user._id == userContext.user._id || userContext.user.isAdmin == 1 &&
                                        <div className="delete-twitt-container">
                                            <i className='bx bx-trash delete-twitt'></i>
                                        </div>
                                    }
                                </>


                            </div>
                            <div className={`${oneTwitt.image ? 'one-twitt-card-second-column-container' : 'one-twitt-card-second-column-container-no-img'}`}>

                                <div className="one-twitt-info-container">
                                    <div className="one-twitt-desc-container">
                                        <p>{oneTwitt.twitt}</p>
                                    </div>
                                </div>
                                {
                                    oneTwitt.image &&
                                    <div className="one-twitt-card-img-container">
                                        <img src={oneTwitt.image_url} alt="" />
                                    </div>
                                }
                            </div>
                            <div className="one-twitt-card-third-column-container">
                                <div className="icon-num-container">
                                    <>
                                        {
                                            userContext && user && user.favourites ?
                                                user.favourites.forEach(fav => fav == oneTwitt._id ? <i className='bx bxs-star full-star' ></i> : <i className='bx bx-star star' ></i>)
                                                :
                                                <i className='bx bx-star star' ></i>
                                        }
                                    </>
                                    <span>{oneTwitt.favourites > 0 ? oneTwitt.favourites : '0'}</span>
                                </div>
                                <div className="icon-num-container">
                                    <i className='bx bx-comment'></i>
                                    <span>{oneTwitt.commentsNumber > 0 ? oneTwitt.commentsNumber : '0'}</span>
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