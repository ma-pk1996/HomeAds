import classes from "./NewAd.module.css"
import { AdsForm } from "../../components/adsForm";
import { useSelector } from "react-redux";

export function NewAd() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const token = localStorage.getItem('token');
    const isTokenExist = token.length > 0;
    return (
        <div className={lightTheme ? classes.light : classes.dark}>
        {isTokenExist && <AdsForm method="post"/>}
        </div>        
    )
}
