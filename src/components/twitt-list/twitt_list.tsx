import { useTwittGlobalContext } from "../../hooks/context/twitts"
import './twitt_list.css'
/* import { Twitt, TwittData } from "../../types" */
import { apiUrl } from "../../utils/utils"

const Twitt_List = () => {

    const context = useTwittGlobalContext()!
    const twitts = context.twitts.data

    console.log(twitts)

    return (
        <section className="home-twitts-container">
            <h1>For you</h1>
            <div className="twitts-list-container">
                {
                    twitts.map((twitt, i) => {

                        return (

                            <div className="twitt-card" key={i}>

                                <div className="twitt-card-first-column-container">
                                <p>USER</p>
                                </div>
                                <div className="twitt-card-second-column-container">
                                    <div className="twitt-info-container">
                                        <div className="twitt-desc-container">
                                            <p>{twitt.twitt}</p>
                                        </div>
                                    </div>
                                    {
                                        twitt.image &&
                                        <div className="twitt-card-img-container">
                                            <img src={`${apiUrl}images/${twitt.image}`} alt="" />
                                        </div>
                                    }
                                </div>


                            </div>
                        )
                    })
                }

            </div>
        </section>
    )
}

export default Twitt_List