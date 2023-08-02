import { useEffect } from 'react'
import { useTwittGlobalContext } from "../../hooks/context/twitts"
import { useUserGlobalContext } from "../../hooks/context/user"
import { apiUrl } from "../../utils/utils"
import LoadingSpinner from "../loading-spinner/loading_spinner"
import Comment from "../comment/comment"
import '../../style-variables/variables.css'
import './one_twitt.css'
import { useParams } from "react-router-dom"
import Create_Comment from '../create-comment/create_comment'

function One_Twitt() {

    const twittContext = useTwittGlobalContext()
    const userContext = useUserGlobalContext()
    /*  const disableOneTwitt = twittContext?.disableOneTwitt */
    const fetchOneTwitt = twittContext?.fetchOneTwitt
    const params = useParams().twittId!

    if (fetchOneTwitt) {
        useEffect(() => {
            fetchOneTwitt(params)
        }, [])
    }

    return (

        <>

            {
                twittContext?.isLoading && <LoadingSpinner />
            }
            {!twittContext?.isLoading && twittContext &&
                <div className="one-twitt-container">

                    <div className={`one-twitt-wrapper ${twittContext.oneTwitt.image ? 'one-twitt-wrapper-img' : '.one-twitt-wrapper-no-img'}`}>

                        <div className={`${twittContext.oneTwitt.image ? 'one-twitt-content-container' : 'one-twitt-content-container-no-img'}`}>

                            <div className="one-twitt-card-first-column-container">
                                <div className="one-twitt-user-avatar-container">
                                    <div className="one-twitt-card-avatar-container">
                                        <img src={`${apiUrl}images/${twittContext.oneTwitt.user.avatar}`} alt="" />
                                    </div>

                                    <div className="one-twitt-card-username-container">
                                        <p>@{twittContext.oneTwitt.user.username}</p>
                                    </div>
                                </div>
                                <>
                                    {
                                        twittContext.oneTwitt.user._id == userContext.user._id || userContext.user.isAdmin == 1 &&
                                        <div className="delete-twitt-container">
                                            <i className='bx bx-trash delete-twitt'></i>
                                        </div>
                                    }
                                </>


                            </div>
                            <div className={`${twittContext.oneTwitt.image ? 'one-twitt-card-second-column-container' : 'one-twitt-card-second-column-container-no-img'}`}>

                                <div className="one-twitt-info-container">
                                    <div className="one-twitt-desc-container">
                                        <p>{twittContext.oneTwitt.twitt}</p>
                                    </div>
                                </div>
                                {
                                    twittContext.oneTwitt.image &&
                                    <div className="one-twitt-card-img-container">
                                        <img src={`${apiUrl}images/${twittContext.oneTwitt.image}`} alt="" />
                                    </div>
                                }
                            </div>
                            <div className="one-twitt-card-third-column-container">
                                <div className="icon-num-container">
                                    <>
                                        {
                                            userContext && userContext.user && userContext.user.favourites ?
                                                userContext.user.favourites.forEach(fav => fav == twittContext.oneTwitt._id ? <i className='bx bxs-star full-star' ></i> : <i className='bx bx-star star' ></i>)
                                                :
                                                <i className='bx bx-star star' ></i>
                                        }
                                    </>
                                    <span>{twittContext.oneTwitt.favourites > 0 ? twittContext.oneTwitt.favourites : '0'}</span>
                                </div>
                                <div className="icon-num-container">
                                    <i className='bx bx-comment'></i>
                                    <span>{twittContext.oneTwitt.commentsNumber > 0 ? twittContext.oneTwitt.commentsNumber : '0'}</span>
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
                            twittContext.oneTwitt?.comments &&
                            twittContext.oneTwitt.comments.map((item, i) => {
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