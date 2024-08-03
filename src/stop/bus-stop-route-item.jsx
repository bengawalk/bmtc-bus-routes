import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import IconBusNumber from "../assets/icon_bus_number.svg";
import {ROUTES, SEARCH_RESULT_TYPES} from "../utils/constants.js";

const BusStopRouteItem = ({ info }) => {
  const [from, to] = info.route_long_name.split("→");
  return (
    <div className="bus-stop-item">
      <div className="bus-item-header">
        <img src={IconBusNumber} alt="" className="bus-item-icon" />
        <Link state={{ from: ROUTES.stop }} className="search-item-text" to={`/route/${info.route_id}`}>
          <span className={SEARCH_RESULT_TYPES.bus_number}>
            {info.route_short_name }
          </span>
        </Link>
        <div className="bus-item-trips">
          { info.trip_count} trips
        </div>
      </div>
      {/* TODO: Change layout to CSS grid later and remove hardcoded width */}
      <div className="bus-stop-item-row">
        <div className="bus-stop-item-fromto">From </div>
        {_.trim(from)}
      </div>
      <div className="bus-stop-item-row">
        <div className="bus-stop-item-fromto">To </div>
        {_.trim(to)}
      </div>
      <div className="bus-stop-item-desc">
        <i>{info.desc}</i>
      </div>

    </div>
  )
};

export default BusStopRouteItem;
