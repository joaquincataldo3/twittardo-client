import { useTwittGlobalContext } from "../../hooks/context/twitts"
import LoadingSpinner from "../loading-spinner/loading_spinner"
import './twitt_list.css'
import Twitt_Card from "../twitt-card/twitt_card"
import { fetchTwittActions } from "../../utils/constants/constants"
import { Twitt } from "../../utils/interfaces/entities/entities_interfaces"
import { FetchActionBtn } from "../fetch-action-btn/fetch_action_btn"

const Twitt_List = () => {

    const twittContext = useTwittGlobalContext()!;
    const { twitts, noTwittsLeft } = twittContext
    const { data } = twitts;
    const { isLoading, fetchTwitts } = twittContext;


    const handleFetchButtonClick = () => {
        fetchTwitts(fetchTwittActions.REGULAR)
    }

    return (
        <section className="home-twitts-container">
            <h1>For you</h1>

            {isLoading &&
                <LoadingSpinner />
            }
            {!isLoading &&
                <>
                    <div className="twitts-list-container">
                        {
                            data.map((twitt: Twitt) => {
                                return (
                                    <Twitt_Card twitt={twitt} key={twitt._id} />
                                )
                            })
                        }

                    </div>
                    <div className="load-more-twitts-container">
                        <FetchActionBtn handleClick={handleFetchButtonClick} widthNum={100}  state={noTwittsLeft}/>

                    </div>
                </>
            }

        </section>
    )
}

export default Twitt_List