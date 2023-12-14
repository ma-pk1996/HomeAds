import { Outlet } from "react-router-dom";
import { Navigation } from "./nav";

export function RootLayout() {
    
    return (
        <>
        <Navigation />
        <Outlet />
        </>
    )
}
