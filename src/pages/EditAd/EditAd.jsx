import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { AdsForm } from "../../components/adsForm";
import classes from "./EditAd.module.css"

export function EditAd() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const ad = useLoaderData();
    return (
        <div className={lightTheme ? classes.light : classes.dark}>
        <AdsForm method="patch" ad={ad}/>
        </div>
    )
}

