import Header from "../header/header";
import Black_Screen from "../black-screen/black_screen";
import MobileNavbar from '../navbar/mobile-navbar/mobile_navbar';
import { Outlet } from "react-router-dom";
import { useUserGlobalContext } from "../../hooks/context/user";

function Shared_Layout() {

    const {isMobileNavbarOpen} = useUserGlobalContext();

    return (
        <>
            <Header />
            <MobileNavbar />
            <Black_Screen state={isMobileNavbarOpen}/>
            <Outlet />
        </>
    )
}

export default Shared_Layout