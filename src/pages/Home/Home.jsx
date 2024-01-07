import { useSelector } from 'react-redux';
import classes from "./Home.module.css"
import { redirect } from 'react-router-dom';

export function Home() {
    const lightTheme = useSelector(state => state.theme.lightTheme);
    const token = localStorage.getItem('token');
    if(!token) {
        return redirect('/');
    }
    return (
        <div className={lightTheme ? classes.home : classes.darkhome}>
            <h2 className={classes.head}>خرید و فروش خانه های خود را به ما بسپارید</h2>
            <img className={classes.khane} src='https://th.bing.com/th/id/R.eb58b09296df027453684020a84378d8?rik=ezjR8ifAGCtVag&pid=ImgRaw&r=0' alt='home'></img>
        </div>
    )
}



