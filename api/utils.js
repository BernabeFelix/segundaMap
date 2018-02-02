const locationsToString = (locations, arr) => {
  if (locations.length) {
    arr.push(locations[0].label);
    if (locations[0].locations) {
      return locationsToString(locations[0].locations, arr);
    }

    return arr.reverse().join(",");
  }
};

// todo: replace this by normalizr
export const getAds = queryResult => {
  if (!queryResult.list_ads) return [];

  return queryResult.list_ads.map(({ ad: { locations, subject } }) => ({
    location: locationsToString(locations, []),
    title: subject
  }));
};
