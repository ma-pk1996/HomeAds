
import { useSelector } from 'react-redux';
import { useNavigate, Form, useNavigation, redirect } from 'react-router-dom';
import classes from './AdsForm.module.css';
import { Map } from "../map";
import { useEffect, useState } from 'react';
import { getAuthToken, getUserID } from '../../utils';
import { processEnv } from '../../process.env';

export function AdsForm({ method, ad }) {
  const navigation = useNavigation(); // will give us current state of the active transition in route when we are submitting the form
  const isSubmitting = navigation.state === 'submitting';
  const [adLoc,setAdLoc] = useState([35.6143033,51.3021608]);
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }
  function getAdLoc(loc) {
    setAdLoc(loc);
  }

  useEffect(()=>{
    document.getElementById("location").value = JSON.stringify(adLoc)
  } ,[adLoc])
  const lightTheme = useSelector(state => state.theme.lightTheme);
  // Form will give us the submit request and send it to the action function
  // name attribute will help us in getting the parameters from backend
  return (
    <Form method={method} className={lightTheme ? classes.form : classes.darkform}> 
      <p>
        <label htmlFor="title">عنوان</label>
        <input id="title" type="text" name="title" required defaultValue={ad ? ad.title : ''}/> 
      </p>
      <p>
        <label htmlFor="image">تصویر</label>
        <input id="image" type="url" name="image" required defaultValue={ad ? ad.image : ''}/>
      </p>
      <p>
        <label htmlFor="price">قیمت</label>
        <input id="price" type="number" name="price" required defaultValue={ad ? ad.price : ''}/>
      </p>
      <p>
        <label htmlFor="description">توضیحات</label>
        <textarea id="description" name="description" rows="5" required defaultValue={ad ? ad.description : ''}/>
      </p>
      <p className={classes.map}>
        <label htmlFor='map'>موقعیت را برای روی نقشه انتخاب کنید</label>
        <input id='location' name='location' type='hidden' />
        <Map onAdLoc={getAdLoc}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          انصراف
        </button>
        <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'ذخیره'}</button>
      </div>
    </Form>
  );
}



export async function action({ request, params }) {
  const userId = getUserID();
  const method = request.method
  const data = await request.formData(); // getting hold of the data that user put in form inputs
  const entered = { 
      title: data.get('title'),
      image: data.get('image'),
      price: data.get('price'),
      description: data.get('description'),
      location: data.get('location'),
      userId: userId
  }

  let url = `${processEnv.REACT_APP_SERVER_URL}ads`;
  if(method === 'PATCH') {
    const id = params.adid;
    url = `${processEnv.REACT_APP_SERVER_URL}ads/` + id;
  }
  const token = getAuthToken();
  const response = fetch(url, {
      method: method,
      headers: {  // to ensure that data sended to backend will extracted correctly
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(entered), // converting data to json format
  })
  return redirect('/ads');
}