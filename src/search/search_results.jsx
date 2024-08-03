import React, { useState, useEffect } from "react";
import _ from "lodash";

import SearchResultItem from "./search_result_item";
import { API_CALL_STATUSES, MAX_HISTORY_LENGTH, ROUTES } from "../utils/constants";
import { CircleLoaderBlock } from "../components/circle_loader";

const SearchResults = ({ apiStatus, searchText, searchResults }) => {
    const [historyItems] = useState(
        JSON.parse(localStorage.getItem("bpt_history") || "[]")
    );
    const [favourites, setFavouritesItems] = useState(
        JSON.parse(localStorage.getItem("bpt_favourites") || "[]")
    );

    const onFavouriteClick = (e, info) => {
        e.stopPropagation();
        e.preventDefault();

        const { id, text, type } = info;
        let newFavourites =[];
        if(_.some(favourites, f => f.id === id && f.type === type)) {
            newFavourites = _.filter(favourites, f => !(f.id === id && f.type === type));
        } else {
            newFavourites = [
                { id, text, type },
                ...favourites
            ];
        }
        setFavouritesItems(newFavourites);
        localStorage.setItem("bpt_favourites", JSON.stringify(newFavourites));
    }

    if(apiStatus === API_CALL_STATUSES.PROGRESS) {
        return (
            <CircleLoaderBlock />
        );
    }

    if(!searchText && _.size(historyItems) > 0) {
        return (
            <div id="search-results">
              <h3 className="subheading">Recent</h3>
              {
                historyItems.map(i => {
                    const isFavourite = _.some(favourites, f => f.id === i.id && f.type === i.type);
                    return (
                        <SearchResultItem
                            key={`${i.id}-${i.text}`}
                            info={i}
                            linkState={{ from: ROUTES.search, query: searchText }}
                            isFavourite={isFavourite}
                            onFavouriteClick={onFavouriteClick}
                        />
                    );
                })
              }
            </div>
        );
    }

    if(!searchText) {
        return "";
    }

    if(_.size(searchResults) === 0) {
        return "No results found";
    }

    return (
        <div id="search-results">
            {
                searchResults.map(i => (
                    <SearchResultItem
                        key={`${i.id}-${i.text}`}
                        info={i}
                        linkState={{ from: ROUTES.search, query: searchText }}
                        onFavouriteClick={onFavouriteClick}
                    />
                ))
            }
          </div>
    )
      
};

export default SearchResults;
