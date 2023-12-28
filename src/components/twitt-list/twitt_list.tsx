import { useTwittGlobalContext } from "../../hooks/context/twitts"
import LoadingSpinner from "../loading-spinner/loading_spinner"
import './twitt_list.css'
import Twitt_Card from "../twitt-card/twitt_card"
import { fetchTwittActions } from "../../utils/utils"

const Twitt_List = () => {

    const twittContext = useTwittGlobalContext()!;
    const {twitts, noTwittsLeft} = twittContext;
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
                            data.map(twitt => {
                                return (
                                    <div className="twitt-card" key={twitt._id}>
                                        <div className="twitt-card-second-column-first-row">
                                            <a href={`/twitts/${twitt._id}`}><i className='bx bx-search-alt-2'></i></a>
                                        </div>
                                        <Twitt_Card twitt={twitt} key={twitt._id} />
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="load-more-twitts-container">
                        <button className="load-more-twitts" onClick={handleFetchButtonClick} style={{pointerEvents: `${noTwittsLeft ? 'none' : 'all'}`}}>{noTwittsLeft ? 'No hay más twitts para cargar' : 'Cargar más twitts'}</button>
                    </div>

                </>
            }

        </section>
    )
}

export default Twitt_List