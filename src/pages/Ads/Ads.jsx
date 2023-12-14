import { useLoaderData } from "react-router-dom";
import { AdsList } from "../../components";
import { useSelector } from "react-redux";
import classes from "./Ads.module.css";


export default function Ads() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const ads = useLoaderData();
    return (
        <div className={lightTheme ? classes.light : classes.dark}>
            <AdsList ads={ads} />
        </div>
    )
}



export async function loader(){
    const response = await fetch('http://localhost:3004/ads');
    if(!response.ok) {
    return {isError: true, message: 'could not fetch ads'}
    }else {
        const resData = await response.json();
        return resData;
    }
}
