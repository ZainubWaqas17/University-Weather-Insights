export async function fetchUniversities(query) {
  const unis = "https://220.maxkuechen.com/universities/search?name=" + query;
  try {
    const fet = await fetch(unis);
    if (!fet.ok) {
      throw new Error(fet.statusText);
    }
    let uniArr = await fet.json();
    uniArr = uniArr.filter(ob => ob["name"] !== undefined).map(ob => ob["name"]);
    return uniArr;
  } catch (err) {
    throw new Error(err.statusText);
  }
}

export async function universityNameLengthOrderAscending(queryName) {
  let count = -Infinity;
  const unis = fetchUniversities(queryName);
  return unis.then(f =>
    f.reduce((acc, e) => {
      if (acc === false) {
        return acc;
      } else if (e.length >= count) {
        count = e.length;
        return true;
      } else if (e.length < count) {
        count = e.length;
        return false;
      }
    }, true)
  );
}
