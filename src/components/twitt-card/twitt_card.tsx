import { TwittCardProps } from "../../types";
import { useUserGlobalContext } from "../../hooks/context/user";
import './twitt_card.css'
import '../../style-variables/variables.css'

function Twitt_Card(props: TwittCardProps) {

    const { twitt } = props;
    const { user } = twitt;
    const userContext = useUserGlobalContext().user

    return (
        <div className="twitt-card" key={twitt._id}>


            <div className="twitt-card-second-column-first-row">
                <a href={`/twitts/${twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
            </div>


            <div className="twitt-content-container">



                <div className="twitt-card-first-column-container">

                    <img src={user.image_url} alt="" />
                </div>
                <div className="twitt-card-second-column-container">

                    <div className="twitt-card-user-info">
                        <p>@{user.username}</p>
                    </div>

                    <div className="twitt-info-container">
                        <div className="twitt-desc-container">
                            <p>{twitt.twitt}</p>
                        </div>
                    </div>
                    {
                        twitt.image_url &&
                        <div className="twitt-card-img-container">
                            <img src={twitt.image_url} alt="" />
                        </div>
                    }
                </div>

            </div>

            <div className="twitt-card-third-column-container">
                <div className="icon-num-container">
                    <>
                        {
                            twitt.user._id != userContext._id ?
                                user.favourites && user.favourites.length > 0 ?
                                     user.favourites.forEach(fav => {
                                    return (
                                        fav == twitt._id && <i className='bx bxs-star full-star' ></i>
                                    )
                                })
                                :
                                <i className='bx bx-star star' ></i>
                                :
                                <div className="fav-number-container">
                                    <p>{twitt.favourites}</p>
                                    <i className='bx bxs-star full-star'></i>
                                </div>
                        }
                    </>

                    <p>{twitt.favourites > 0 ? twitt.favourites : '0'}</p>
                </div>
                <div className="icon-num-container">
                    <i className='bx bx-comment'></i>
                    <p>{twitt.commentsNumber > 0 ? twitt.commentsNumber : '0'}</p>
                </div>
            </div>

        </div>
    )
}

export default Twitt_Card