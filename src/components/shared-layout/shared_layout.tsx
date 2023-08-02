import { Outlet } from "react-router-dom"
import Header from "../header/header"
import Black_Screen from "../black-screen/black_screen"


function Shared_Layout() {

    return (
        <>
            <Header />
            <Black_Screen />
            <Outlet />
        </>
    )
}

export default Shared_Layout