import { URL } from "url"; // Import the URL class from the url library

export function fetchGeoCoord(query) {
  // TODO
  const err = () => Promise.reject(new Error("No results found for query."));
  const err2 = () => Promise.reject(new Error("Does not have lon, lat, or importance"));
  const err3 = () => Promise.reject(new Error("Return is not an Array"));

  const api = new URL("https://220.maxkuechen.com/geoCoord/search");
  api.searchParams.append("q", query);
  const api2 = api.toString();
  return fetch(api2)
    .then(response => (response.ok ? response : err())) // We need to check if there was an error in the response.
    .then(resp => resp.json())
    .then(resp => (resp.length !== 0 ? resp : err()))
    .then(j => (Array.isArray(j) ? j : err3()))
    .then(data => (data[0].lon && data[0].lat && data[0].importances ? data : err2()))
    .then(data => {
      return {
        lon: Number.parseFloat(data[0].lon),
        lat: Number.parseFloat(data[0].lat),
        importances: data[0].importances,
      };
    });
}

export function locationImportantEnough(place, importanceThreshold) {
  // TODO
  return fetchGeoCoord(place).then(data => data.importances.some(e => e > importanceThreshold));
}
