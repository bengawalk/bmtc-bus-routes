import React, {useEffect, useState} from "react";
import _ from "lodash";
import {Icon} from "@iconify/react/dist/iconify.js";
import {API_CALL_STATUSES, ROUTES, SEARCH_RESULT_TYPES} from "../utils/constants.js";
import {Link} from "react-router-dom";
import { getSearchResultsApi } from "../utils/api.js";
import { deleteUrlParameter, getUrlParameter, setUrlParameter, useDebouncedValue } from "../utils/index.js";
import SearchResults from "./search_results.jsx";

const SearchPage = () => {
  const [searchText, setSearchText] = useState(getUrlParameter("q") || "");
  const [apiStatus, setApiStatus] = useState(API_CALL_STATUSES.INITIAL);
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchText = useDebouncedValue(searchText, 500);

  useEffect(() => {
    if(!searchText) {
      setSearchResults([]);
      return;
    }
    const apiCall = async () => {
      const results = await getSearchResultsApi(searchText);
      setSearchResults(_.map(results.data.data, r => (
        {
          type: r.type === "route" ? SEARCH_RESULT_TYPES.bus_number : SEARCH_RESULT_TYPES.bus_stop,
          text: r.name,
          id: r.id,
        }
      )));
      setApiStatus(API_CALL_STATUSES.SUCCESS);
    }
    apiCall();
  }, [debouncedSearchText]);

  useEffect(() => {
    let newParams = "";
    if(searchText) {
      newParams = setUrlParameter("q", searchText);
      setApiStatus(API_CALL_STATUSES.PROGRESS);
    } else {
      newParams = deleteUrlParameter("q");
      setApiStatus(API_CALL_STATUSES.INITIAL);
    }
    const newParamString = newParams.toString();
    if(newParamString) {
      history.replaceState(null, null, `?${newParamString}`);
    } else {
      history.replaceState(null, null, window.location.href.split("?")[0]);
    }
  }, [searchText]);

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
          placeholder="Search for a bus, metro, or bus stop"
        />
      </div>
      <SearchResults
        apiStatus={apiStatus}
        searchText={searchText}
        searchResults={searchResults}
      />
      
    </>
  );
};

export default SearchPage;
