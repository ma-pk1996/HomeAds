import { Link } from 'react-router-dom';
import classes from './AdsList.module.css';
import { useSelector } from 'react-redux';



export function AdsList({ ads }) {
  const lightTheme = useSelector(state => state.theme.lightTheme);
  return (
    <div className={lightTheme ? classes.ads : classes.darkads} style={{ marginLeft: '15rem' }}>
      <h1 className={classes.head} >آگهی ها</h1>
      <ul className={lightTheme ? classes.list : classes.darklist}>
          {ads?.map((ad) => (
          <li key={ad.id} className={lightTheme ? classes.item : classes.darki}>
              <Link to={`/ads/${ad.id}`}>
              <img src={ad.image} alt={ad.title} />
              <div className={lightTheme ? classes.content : classes.darkcontent}>
                  <p>{ad.title}</p>
                  <p className={classes.par}>قیمت(میلیون تومان) : {ad.price}</p>
                  <p className={classes.par}>توضیحات : {ad.description}</p>
              </div>
              </Link>
          </li>
          ))}
      </ul>
    </div>
  );
}
