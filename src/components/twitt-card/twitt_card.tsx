import { TwittCardProps } from "../../types";
import './twitt_card.css'
import '../../style-variables/variables.css'

function Twitt_Card(props: TwittCardProps) {

    const { twitt } = props;
    const { user } = twitt;

    return (
        <>

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
                            user.favourites && user.favourites.length > 0 ?
                                user.favourites.forEach(fav => {
                                    return (
                                        fav == twitt._id && <i className='bx bxs-star full-star' ></i>
                                    )
                                })
                                :
                                <i className='bx bx-star star' ></i>

                        }
                    </>

                    <p>{twitt.favourites > 0 ? twitt.favourites : '0'}</p>
                </div>
                <div className="icon-num-container">
                    <i className='bx bx-comment'></i>
                    <p>{twitt.commentsNumber > 0 ? twitt.commentsNumber : '0'}</p>
                </div>
            </div>

        </>
    )
}

export default Twitt_Card