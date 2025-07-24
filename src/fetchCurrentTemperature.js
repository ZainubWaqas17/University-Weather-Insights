export async function fetchCurrentTemperature(coords) {
  // TODO
  const latitude = coords.lat;
  const longitude = coords.lon;
  // build the api url with the required query arguments
  const apiLink = `https://220.maxkuechen.com/currentTemperature/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit`;
  try {
    const resp = await fetch(apiLink);
    if (!resp.ok) {
      // handle HTTP errors by throwing an exception
      throw new Error(`HTTP error, status = ${resp.status}: ${resp.statusText}`);
    } else {
      const element = await resp.json();
      // if (!element.hourly || !Array.isArray(element.hourly.time) || !Array.isArray(element.hourly.temperature_2m)) {
      //   throw new Error("invalid data received from the api")
      // }
      const { time, temperature_2m } = element.hourly;
      return { time, temperature_2m };
    }
  } catch (error) {
    // handle fetching errors
    throw new Error(`failed to fetch temp: ${error.message || "Unknown error"}`);
  }
}

export async function tempAvgAboveAtCoords(coords, temp) {
  // TODO

  // fetch the current temperature for given coord
  const { temperature_2m } = await fetchCurrentTemperature(coords);
  const tempLength = temperature_2m.length;
  // ensure data is not empty
  if (tempLength === 0) {
    throw new Error("temperature data unavailable");
  }
  // calculate the avg
  const tally = temperature_2m.reduce((sum, e) => sum + e, 0);
  const avg = tally / tempLength;
  // return true if avg is greater than threshold, false otherwise
  return avg > temp ? true : false;
}
