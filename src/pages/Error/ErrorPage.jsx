import classes from "./ErrorPage.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function ErrorPage() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    return (
        <div className={lightTheme ? classes.content : classes.darkc}>
        <h3>... این راه به جایی نمی رسد</h3>
        <img className={classes.panda} src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png" alt="404 code" />
        <h4>!از اینجا راهتو پیدا کن</h4>
        <NavLink to="">صفحه ورود</NavLink>
        </div>
    )
}

