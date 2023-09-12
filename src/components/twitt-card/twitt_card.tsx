import { TwittCardProps } from "../../types"
import './twitt_card.css'
import '../../style-variables/variables.css'

import { useUserGlobalContext } from "../../hooks/context/user"

function Twitt_Card(props: TwittCardProps) {

    const userContext = useUserGlobalContext()

    return (
        <div className="twitt-card" key={props.twitt._id}>


            <div className="twitt-card-second-column-first-row">
                <a href={`/twitts/${props.twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
            </div>


            <div className="twitt-content-container">

                <div className="twitt-card-first-column-container">
                    <img src={props.twitt.user.image_url} alt="" />
                </div>
                <div className="twitt-card-second-column-container">

                    <div className="twitt-info-container">
                        <div className="twitt-desc-container">
                            <p>{props.twitt.twitt}</p>
                        </div>
                    </div>
                    {
                        props.twitt.image_url &&
                        <div className="twitt-card-img-container">
                            <img src={props.twitt.image_url} alt="" />
                        </div>
                    }
                </div>

            </div>

            <div className="twitt-card-third-column-container">
                <div className="icon-num-container">
                    <>
                        {
                            userContext && userContext.user.favourites.length > 0 ?
                                userContext.user.favourites.forEach(fav => {
                                    return (
                                        fav == props.twitt._id && <i className='bx bxs-star full-star' ></i>
                                    ) 
                                })       
                                :
                                <i className='bx bx-star star' ></i>              
                        }
                    </>

                    <p>{props.twitt.favourites > 0 ? props.twitt.favourites : '0'}</p>
                </div>
                <div className="icon-num-container">
                    <i className='bx bx-comment'></i>
                    <p>{props.twitt.commentsNumber > 0 ? props.twitt.commentsNumber : '0'}</p>
                </div>
            </div>

        </div>
    )
}

export default Twitt_Card