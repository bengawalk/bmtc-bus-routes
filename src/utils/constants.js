export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const BACKEND_HOST =  import.meta.env.VITE_PUBLIC_BACKEND_HOST;

export const MAX_HISTORY_LENGTH = 20;

export const ROUTES = {
  home: "/",
  search: "/search",
  favourites: "/favourites",
  route: "/route/:route_id",
  stop: "/stop/:stop_id",

  all_buses: "/all-buses",
  about: "/about",
};

export const SEARCH_RESULT_TYPES = {
  location: "location",
  bus_stop: "bus_stop",
  metro_station_purple: "metro_station_purple",
  metro_station_green: "metro_station_green",
  bus_number: "bus_number",
};

export const API_CALL_STATUSES = {
  INITIAL: "INITIAL",
  PROGRESS: "PROGRESS",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};