import { useTwittGlobalContext } from "../../hooks/context/twitts"
import LoadingSpinner from "../loading-spinner/loading_spinner"
import './twitt_list.css'
import Twitt_Card from "../twitt-card/twitt_card"
import { fetchTwittActions } from "../../utils/utils"

const Twitt_List = () => {

    const twittContext = useTwittGlobalContext()!
    const {data} = twittContext.twitts
    const { isLoading, fetchTwitts } = twittContext
    

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
                            data.map((twitt, i) => {
                                return (
                                    <Twitt_Card twitt={twitt} key={i} />

                                )
                            })
                        }

                    </div>
                    <div className="load-more-twitts-container">
                    <button className="load-more-twitts" onClick={handleFetchButtonClick}>Cargar más twitts</button>
                    </div>
                    
                </>
            }

        </section>
    )
}

export default Twitt_List