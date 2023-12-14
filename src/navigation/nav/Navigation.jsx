import { Form, NavLink, redirect, useRouteLoaderData } from "react-router-dom";
import classes from "./Navigation.module.css"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { themeAction } from "../../context";
import * as Icon from 'react-bootstrap-icons';
export function Navigation () {
    const token = useRouteLoaderData('root');
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const dispatch = useDispatch();

    function toggleHandler() {
        dispatch(themeAction.toggle());
    }

    return (
        <header className={lightTheme ? classes.header : classes.darkheader}>
            <nav>
                <ul className={classes.list}>
                    {token && <li><Form action="/logout" method="post"><button>خروج</button></Form></li>}
                    <li><button style={{ width: '5rem' }} onClick={toggleHandler}>{lightTheme ? <Icon.MoonFill/> : <Icon.BrightnessHighFill />}  {lightTheme ? "تاریک" : "روشن"}</button></li>
                    {token && <li><NavLink to="ads/newad" className={({ isActive }) => isActive ? classes.active : undefined}>آگهی جدید</NavLink></li>}
                    {token && <li><NavLink to='ads' className={({ isActive }) => isActive ? classes.active : undefined}>آگهی ها</NavLink></li>}
                    {token && <li><NavLink to='home' className={({ isActive }) => isActive ? classes.active : undefined}>خانه</NavLink></li>}
                </ul>
            </nav>
        </header>
    )
}


export function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/');
}