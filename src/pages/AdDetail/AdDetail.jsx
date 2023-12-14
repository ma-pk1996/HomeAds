import { useSelector } from 'react-redux';
import { redirect, useLoaderData } from 'react-router-dom';
import { AdItem } from '../../components';
import classes from "./AdDetail.module.css"
import { getAuthToken } from '../../utils';



export function AdsDetail() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const ad = useLoaderData();
    return (
        <div className={lightTheme ? classes.light : classes.dark}>
            <AdItem ad={ad} />
        </div>
    );
}


export async function loader({ params }) {
    const id = params.adid;
    const response = await fetch(`http://localhost:3004/ads/${id}`);
    if(!response.ok) {
        return {isError: true, message: 'could not fetch ad'}; 
    } else {
        const resData = await response.json();
        return resData;
    }
}


export async function action({ params, request }) {
    const id = params.adid;
    const token = getAuthToken();
    const response = await fetch('http://localhost:3004/ads/' + id, {
        method: request.method,
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });
    if(!response.ok) {
        return {isError: true, message: 'could not fetch ads'}; 
    }
    return redirect('/ads');
}
