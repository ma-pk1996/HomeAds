import classes from "./NewAd.module.css"
import { AdsForm } from "../../components/adsForm";
import { useSelector } from "react-redux";

export function NewAd() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    return (
        <div className={lightTheme ? classes.light : classes.dark}>
        <AdsForm method="post"/>
        </div>        
    )
}
