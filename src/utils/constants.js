export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const ROUTES = {
  home: "/",
  search: "/search",
  favourites: "/favourites",
  all_buses: "/all-buses",
  about: "/about",
  bus_route: "/bus-route/:route_id",
  bus_stop: "/bus-stop/:stop_id",
};

export const SEARCH_RESULT_TYPES = {
  location: "location",
  bus_stop: "bus_stop",
  metro_station_purple: "metro_station_purple",
  metro_station_green: "metro_station_green",
  bus_number: "bus_number",
};