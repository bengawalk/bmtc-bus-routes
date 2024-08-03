import React from 'react';
import ReactDOM from 'react-dom/client';
import "mapbox-gl/dist/mapbox-gl.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.scss';
import SearchPage from "./search/index.jsx";
import LandingPage from "./landing/index.jsx";
import {ROUTES} from "./utils/constants.js";
import AboutPage from "./about/index.jsx";
import AllBusesPage from "./all-buses";
import FavouritesPage from "./favourites/index.jsx";
import RoutePage from "./route";
import StopPage from "./stop";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <LandingPage />,
  },
  {
    path: ROUTES.search,
    element: <SearchPage />
  },
  {
    path: ROUTES.about,
    element: <AboutPage />
  },
  {
    path: ROUTES.all_buses,
    element: <AllBusesPage />
  },
  {
    path: ROUTES.favourites,
    element: <FavouritesPage />
  },
  {
    path: ROUTES.route,
    element: <RoutePage />
  },
  {
    path: ROUTES.stop,
    element: <StopPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
