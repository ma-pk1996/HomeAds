import classes from './AdItem.module.css';
import { Link, useSubmit } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const markerIcon = new L.Icon({
  iconUrl: require("../../assets/mapmarker.png"),
  iconSize: [35, 35],
  iconAnchor: [12, 40],
  popupAnchor: [3, -40]
});


export function AdItem({ ad }) {
  const zoomLevel = 10;
  const submit = useSubmit();

  function deleteHandler() {
    const proceed = window.confirm('Are You Sure?!');
    if(proceed) {
      submit(null, {method: 'DELETE'});
    }
  }


  return (
    <article className={classes.ad}>
      <h1>{ad.title}</h1>
      <p>قیمت : {ad.price}</p>
      <p>{ad.description}</p>
      <img src={ad.image} alt={ad.title} />
      <div className={classes.container}>
        <MapContainer style={{ height: '18rem', borderRadius: '8px' }} center={[35.7, 51.4]} zoom={zoomLevel} scrollWheelZoom={true}>
          <TileLayer
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=m3Uw9viTGOipjGtDWWTu"
          />
          <Marker icon={markerIcon} position={JSON.parse(ad.location)} />
        </MapContainer>
      </div>
      <menu className={classes.actions}>
        <Link to="edit">ویرایش</Link>
        <button onClick={deleteHandler}>حذف آگهی</button>
      </menu>
    </article>
  );
}

