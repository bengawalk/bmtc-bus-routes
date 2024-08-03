import React, { useState } from "react";
import _ from "lodash";
import {Icon} from "@iconify/react/dist/iconify.js";
import SearchResultItem from "../search/search_result_item";
import {MAX_HISTORY_LENGTH, ROUTES} from "../utils/constants.js";
import {Link} from "react-router-dom";

const FavouritesPage = () => {
  const [favourites, setFavouritesItems] = useState(
      JSON.parse(localStorage.getItem("bpt_favourites") || "[]")
  );

  const removeFromFavourites = (e, info) => {
    e.stopPropagation();
    e.preventDefault();

    const { id, type } = info;
    const newFavourites = _.filter(favourites, f => !(f.id === id && f.type === type));
    setFavouritesItems(newFavourites);
    localStorage.setItem("bpt_favourites", JSON.stringify(newFavourites));
  }

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
          _.size(favourites) > 0 ? (
            favourites.map(i => (
              <SearchResultItem
                isFavourite
                key={`${i.id}-${i.text}`}
                info={i}
                linkState={{ from: ROUTES.favourites }}
                onFavouriteClick={removeFromFavourites}
              />
            ))
          ) : (
            "You do not have any favourites added"
          )
        }
      </div>
    </>
  );
};

export default FavouritesPage;
