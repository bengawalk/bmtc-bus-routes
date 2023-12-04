import React from "react";

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

const SearchResultItem = ({ info }) => {
  const IconForInfo = IconForResultType[info.type];
  return (
    // TODO: Change the key. Text could be common between two items
    <div className="search-result-item">
      <img src={IconForInfo} className="search-item-icon" alt="" />
      <div className="search-item-text">
        <span className={info.type}>
          {
            info.text
          }
        </span>
      </div>
      <button className="search-result-favourite">
        {
          info.favourite ? (
            <Icon icon="tabler:star-filled" color="#FFD027" width="16" height="16" />
          ) : (
            <Icon icon="tabler:star" color="#999999" width="16" height="16" />
          )
        }
      </button>
    </div>
  );
};

export default SearchResultItem;
