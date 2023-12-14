import classes from "./App.module.css";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as detailLoader, action as itemAction, AdsDetail} from "./pages/AdDetail";
import { action as authAction, AuthenticationPage } from "./pages";
import { NewAd } from "./pages";
import { EditAd } from "./pages";
import { RootLayout } from "./navigation";
import { ErrorPage } from "./pages";
import { AdsRootLayout } from "./navigation"
import { action as formAction } from "./components/adsForm";
import { action as logoutAction } from "./navigation/nav";
import { tokenLoader } from "./utils";
import { Home } from "./pages";



const Ads = lazy(() => import('./pages/Ads/Ads'));




const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  id: 'root',
  loader: tokenLoader,
  children: [
    {index: true, element: <AuthenticationPage />, action: authAction},
    {path: 'home', element: <Home />},
    {path: 'logout', action: logoutAction},
    {path: 'ads', element: <AdsRootLayout /> ,children: [
      {index: true, element: <Suspense 
        fallback={<p style={{ textAlign: 'center', justifyContent: 'center' }}>Loading...</p>}><Ads /></Suspense>, 
        loader: (meta) => import('./pages/Ads/Ads').then(module => module.loader(meta))},
      {path: ':adid', children: [
        {index: true, element: <AdsDetail />, action: itemAction, loader: detailLoader},
        {path: 'edit', element: <EditAd />, action: formAction, loader: detailLoader}
      ]},
      {path: 'newad', element: <NewAd />, action: formAction}
    ]},
  ]  
}]);


function App() {
  const lightTheme = useSelector(state => state.theme.lightTheme);
  return (
    <div className={lightTheme ? classes.light : classes.dark}>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
