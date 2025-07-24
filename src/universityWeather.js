import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchUniversities } from "./fetchUniversities.js";

export async function fetchUniversityWeather(universityQuery, transformName) {
  // TODO
  const uniList = await fetchUniversities(universityQuery);
  const geoList = [];
  const tempList = [];
  for (let i = 0; i < uniList.length; i++) {
    if (transformName) {
      geoList.push(await fetchGeoCoord(transformName(uniList[i])));
    } else {
      geoList.push(await fetchGeoCoord(uniList[i]));
    }
  }
  for (let i = 0; i < geoList.length; i++) {
    tempList.push(await fetchCurrentTemperature({ lat: geoList[i].lat, lon: geoList[i].lon }));
  }
  const ret = {};
  const avg_arr = [];
  for (let i = 0; i < uniList.length; i++) {
    let sum = 0;
    for (let k = 0; k < tempList[i].temperature_2m.length; k++) {
      sum = sum + tempList[i].temperature_2m[k];
    }
    sum /= tempList[i].temperature_2m.length;
    avg_arr.push(sum);
    ret[uniList[i]] = sum;
  }
  ret["totalAverage"] = avg_arr.reduce((res, e) => (res += e), 0) / avg_arr.length;
  return ret;
}

export function trans_name(name) {
  const data = name.split(" ");
  return data.filter(x => x !== "at" ).join(" ");
}

export async function fetchUMassWeather() {
  // TODO
  return fetchUniversityWeather("University of Massachusetts", trans_name);
}

export function trans_name_mich(name) {
  const data = name.split("-");
  return data.filter(x => x !== "-").join(" ");
}

export async function fetchUMichWeather() {
  // TODO
  return fetchUniversityWeather("University of Michigan", trans_name_mich);
}
