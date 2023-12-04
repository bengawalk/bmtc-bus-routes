import React from "react";
import {Icon} from "@iconify/react/dist/iconify.js";
import SearchResultItem from "../search/search_result_item";
import {ROUTES, SEARCH_RESULT_TYPES} from "../utils/constants.js";
import {Link} from "react-router-dom";

const FAVOURITES = [
  {
    type: SEARCH_RESULT_TYPES.location,
    text: "Mayur Paradise",
    favourite: true,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_stop,
    text: "Tippasandra Market Bus Stop",
    favourite: true,
  },
  {
    type: SEARCH_RESULT_TYPES.metro_station_purple,
    text: "Nadaprabhu Kempegowda Metro Station, Majestic",
    favourite: true,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_number,
    text: "314",
    favourite: true,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_number,
    text: "333G",
    favourite: true,
  },
];

const FavouritesPage = () => {
  return (
    <>
      <div id="page-header">
        <Link id="header-back" to={ROUTES.home}>
          <Icon icon="mdi:arrow-back" color="#FFFFFF" width="24" height="24" />
        </Link>
        <p id="header-text" className="center">
          <span>
            Favourites
          </span>
        </p>
      </div>
      <div id="search-results">
        {
          FAVOURITES.map(i => <SearchResultItem key={i.text} info={i} />)
        }
      </div>
    </>
  );
};

export default FavouritesPage;
