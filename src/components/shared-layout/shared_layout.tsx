import Header from "../header/header"
import Black_Screen from "../black-screen/black_screen"
import MobileNavbar from '../navbar/mobile-navbar/mobile_navbar'
import { Outlet } from "react-router-dom"

function Shared_Layout() {

    return (
        <>
            <Header />
            <MobileNavbar />
            <Black_Screen />
            <Outlet />
        </>
    )
}

export default Shared_Layout