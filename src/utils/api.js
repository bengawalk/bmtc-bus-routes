import axios from "axios";
import { BACKEND_HOST } from "./constants";

export const getSearchResultsApi = (searchText) => axios.get(`${BACKEND_HOST}/enroute/search/?q=${searchText}`);

export const getRouteDetailsApi = (routeId) => axios.get(`${BACKEND_HOST}/enroute/route/${routeId}`);

export const getStopDetailsApi = (stopId) => axios.get(`${BACKEND_HOST}/enroute/stop/${stopId}`);
