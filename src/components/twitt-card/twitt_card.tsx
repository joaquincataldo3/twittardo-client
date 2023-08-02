import { TwittCardProps } from "../../types"
import { apiUrl } from "../../utils/utils"
import './twitt_card.css'
import '../../style-variables/variables.css'

import { useUserGlobalContext } from "../../hooks/context/user"

function Twitt_Card(twitt: TwittCardProps) {

    const userContext = useUserGlobalContext()
    /*   const setOneTwitt = twittContext?.setOneTwitt */


    return (
        <div className="twitt-card" key={twitt.twitt._id}>


            <div className="twitt-card-second-column-first-row">
                <a href={`/twitts/${twitt.twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
            </div>


            <div className="twitt-content-container">

                <div className="twitt-card-first-column-container">
                    <img src={`${apiUrl}images/${twitt.twitt.user.avatar}`} alt="" />
                </div>
                <div className="twitt-card-second-column-container">

                    <div className="twitt-info-container">
                        <div className="twitt-desc-container">
                            <p>{twitt.twitt.twitt}</p>
                        </div>
                    </div>
                    {
                        twitt.twitt.image &&
                        <div className="twitt-card-img-container">
                            <img src={`${apiUrl}images/${twitt.twitt.image}`} alt="" />
                        </div>
                    }
                </div>

            </div>

            <div className="twitt-card-third-column-container">
                <div className="icon-num-container">
                    <>
                        {
                            userContext && userContext.user && userContext.user.favourites ?
                                userContext.user.favourites.forEach(fav => fav == twitt.twitt._id ? <i className='bx bxs-star full-star' ></i> : <i className='bx bx-star star' ></i>)
                                :
                                <i className='bx bx-star star' ></i>
                        }
                    </>

                    <p>{twitt.twitt.favourites > 0 ? twitt.twitt.favourites : '0'}</p>
                </div>
                <div className="icon-num-container">
                    <i className='bx bx-comment'></i>
                    <p>{twitt.twitt.commentsNumber > 0 ? twitt.twitt.commentsNumber : '0'}</p>
                </div>
            </div>

        </div>
    )
}

export default Twitt_Card