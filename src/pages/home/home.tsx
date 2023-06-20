import Black_Screen from "../../components/black-screen/black-screen"
import Header from "../../components/header/header"
import Mobile_Navbar from '../../components/navbar/mobile-navbar/mobile_navbar'

import './home.css'
import Twitt_List from "../../components/twitt-list/twitt_list"


function Home() {
  return (

    <>
    <Header />
    <Mobile_Navbar />
    <Black_Screen/>

    <Twitt_List/>

   {/*  <section className="home-twitts-container">
      <h1>For you</h1>
      <div className="twitts-list-container">
        <div className="twitt-card">
          <div className="twitt-card-img-container">
            <img src={JonSnowLogo} alt="" />
          </div>
          <div className="twitt-info-container">
            <div className="twitt-desc-container">
              <p>Este es un twitt de prueba pàra poner a prueba la funcionalidad de twittardo, donde pondremos a prueba todo tipo de experimento</p>
            </div>
          </div>
        </div>
        <div className="twitt-card">
          <div className="twitt-card-img-container">
            <img src={JonSnowLogo} alt="" />
          </div>
          <div className="twitt-info-container">
            <div className="twitt-desc-container">
              <p>Este es un twitt de prueba pàra poner a prueba la funcionalidad de twittardo, donde pondremos a prueba todo tipo de experimento</p>
            </div>
          </div>
        </div>
        <div className="twitt-card">
          <div className="twitt-card-img-container">
            <img src={JonSnowLogo} alt="" />
          </div>
          <div className="twitt-info-container">
            <div className="twitt-desc-container">
              <p>Este es un twitt de prueba pàra poner a prueba la funcionalidad de twittardo, donde pondremos a prueba todo tipo de experimento</p>
            </div>
          </div>
        </div>
        <div className="twitt-card">
          <div className="twitt-card-img-container">
            <img src={JonSnowLogo} alt="" />
          </div>
          <div className="twitt-info-container">
            <div className="twitt-desc-container">
              <p>Este es un twitt de prueba pàra poner a prueba la funcionalidad de twittardo, donde pondremos a prueba todo tipo de experimento</p>
            </div>
          </div>
        </div>
        
      </div>
    </section> */}
    </>
  )
}

export default Home
