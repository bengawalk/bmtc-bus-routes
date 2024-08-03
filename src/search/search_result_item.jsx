import React from "react";
import { Link } from "react-router-dom";

import IconBusStop from "../assets/icon_bus_stop.svg";
import IconBusNumber from "../assets/icon_bus_number.svg";
import IconMetroPurple from "../assets/icon_metro_purple.svg";
import IconMetroGreen from "../assets/icon_metro_green.svg";
import IconLocation from "../assets/icon_location.svg";
import {SEARCH_RESULT_TYPES} from "../utils/constants.js";
import {Icon} from "@iconify/react/dist/iconify.js";

const IconForResultType = {
  [SEARCH_RESULT_TYPES.bus_stop]: IconBusStop,
  [SEARCH_RESULT_TYPES.bus_number]: IconBusNumber,
  [SEARCH_RESULT_TYPES.metro_station_green]: IconMetroGreen,
  [SEARCH_RESULT_TYPES.metro_station_purple]: IconMetroPurple,
  [SEARCH_RESULT_TYPES.location]: IconLocation,
};

const getLink = (info) => {
  if(info.type === SEARCH_RESULT_TYPES.bus_stop) {
    return `/stop/${info.id}`;
  }
  return `/route/${info.id}`;
}

const SearchResultItem = ({ info, isFavourite, linkState, onItemClick = () => {}, onFavouriteClick }) => {
  const IconForInfo = IconForResultType[info.type];
  return (
    <Link state={linkState} className="search-result-item" to={getLink(info)} onClick={() => onItemClick(info)}>
      <img src={IconForInfo} className="search-item-icon" alt="" />
      <div className="search-item-text">
        <span className={info.type}>
          {
            info.text
          }
        </span>
      </div>
      <button className="search-result-favourite" onClick={(e) => onFavouriteClick(e, info)}>
        {
          isFavourite ? (
            <Icon icon="tabler:star-filled" color="#FFD027" width="16" height="16" />
          ) : (
            <Icon icon="tabler:star" color="#999999" width="16" height="16" />
          )
        }
      </button>
    </Link>
  );
};

export default SearchResultItem;
