import { Outlet } from "react-router-dom"
import Header from "../header/header"

function Shared_Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Shared_Layout