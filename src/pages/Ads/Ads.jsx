import { redirect, useLoaderData } from "react-router-dom";
import { AdsList } from "../../components";
import { useSelector } from "react-redux";
import classes from "./Ads.module.css";
import { processEnv } from '../../process.env';

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
    const token = localStorage.getItem('token');
    if(!token) {
        return redirect('');
    }
    const url = `${processEnv.REACT_APP_SERVER_URL}ads`;
    const response = await fetch(url);
    if(!response.ok) {
    return {isError: true, message: 'could not fetch ads'}
    }else {
        const resData = await response.json();
        return resData;
    }
}
