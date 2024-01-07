import classes from "./NewAd.module.css"
import { AdsForm } from "../../components/adsForm";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export function NewAd() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const token = localStorage.getItem('token');
    if(!token) {
        return redirect('/');
    }
    return (
        <div className={lightTheme ? classes.light : classes.dark}>
        <AdsForm method="post"/>
        </div>        
    )
}
