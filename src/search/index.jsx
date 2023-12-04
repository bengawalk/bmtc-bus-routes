import React, {useState} from "react";
import {Icon} from "@iconify/react/dist/iconify.js";
import SearchResultItem from "./search_result_item";
import {ROUTES, SEARCH_RESULT_TYPES} from "../utils/constants.js";
import {Link} from "react-router-dom";

const HISTORY_ITEMS = [
  {
    type: SEARCH_RESULT_TYPES.location,
    text: "Mayur Paradise",
    favourite: false,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_stop,
    text: "Tippasandra Market Bus Stop",
    favourite: true,
  },
  {
    type: SEARCH_RESULT_TYPES.metro_station_purple,
    text: "Nadaprabhu Kempegowda Metro Station, Majestic",
    favourite: false,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_number,
    text: "314",
    favourite: false,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_number,
    text: "333G",
    favourite: false,
  },
];

const SEARCH_RESULTS = [
  {
    type: SEARCH_RESULT_TYPES.location,
    text: "Indiranagar Cafe Grill",
    favourite: false,
  },
  {
    type: SEARCH_RESULT_TYPES.bus_stop,
    text: "Indiranagar 100 Feet Road",
    favourite: true,
  },
  {
    type: SEARCH_RESULT_TYPES.metro_station_purple,
    text: "Indiranagar Metro Station",
    favourite: false,
  },
]

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <div id="page-header">
        <Link id="header-back" to={ROUTES.home}>
          <Icon icon="mdi:arrow-back" color="#FFFFFF" width="24" height="24" />
        </Link>
        <input
          id="search-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search for a place, bus. or bus stop"
        />
      </div>
      {
        searchText ? (
          <div id="search-results">
            {
              SEARCH_RESULTS.map(i => <SearchResultItem key={i.text} info={i} />)
            }
          </div>
        ) : (
          <div id="search-results">
            <h3 className="subheading">History</h3>
            {
              HISTORY_ITEMS.map(i => <SearchResultItem key={i.text} info={i} />)
            }
          </div>
        )
      }
    </>
  );
};

export default SearchPage;
