import { jest } from "@jest/globals";
// import { AssertionError } from "assert";
import assert from "assert";
import { fetchGeoCoord, locationImportantEnough } from "./fetchGeoCoord.js";
import fetchMock from "jest-fetch-mock";

const SECOND = 1000;
jest.setTimeout(30 * SECOND);

describe("fetchGeoCoord", () => {
  // TODO
  it("follows type specification", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");

    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(typeof result.lon === "number"); // Assert that the lon value is a number
      assert(typeof result.lat === "number"); // Assert that the lat value is a number
      assert(typeof result.importances === "object"); // Assert that the importances value is an object
      assert(Object.keys(result).length === 3); // Assert there are only two keys in the object
    });
  });

  it("check for nonexistent place", async () => {
    const promise = fetchGeoCoord("someplace that doesn't exist");
    return await expect(promise).rejects.toEqual(new Error("No results found for query."));
  });

  it("mock test", async () => {
    const res = [
      {
        place_id: 315263814,
        licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        osm_type: "relation",
        osm_id: 9361144,
        boundingbox: ["42.3736193", "42.4004261", "-72.5416466", "-72.5045426"],
        lat: "42.386969300000004",
        lon: "-72.53018467326824",
        display_name:
          "University of Massachusetts Amherst, Natural Resources Road, Amherst, Hampshire County, Massachusetts, 01003, United States",
        class: "amenity",
        type: "university",
        importances: [
          0.37785773838607906, 0.3156855235667493, 0.3331588207658839, 0.40067458913730014, 0.3993654503168752,
        ],
      },
    ];

    fetchMock.enableMocks();
    fetchMock.mockResponse(JSON.stringify(res));

    const result = await fetchGeoCoord("someplace");

    assert(result.lon === -72.53018467326824);
    assert(result.lat === 42.386969300000004);
    assert(result.importances.length === 5);
    assert(result.importances[0] === 0.37785773838607906);

    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
});

describe("locationImportantEnough", () => {
  // TODO
  it("Checking for true and false with mock", async () => {
    const res = [
      {
        place_id: 315263814,
        licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        osm_type: "relation",
        osm_id: 9361144,
        boundingbox: ["42.3736193", "42.4004261", "-72.5416466", "-72.5045426"],
        lat: "42.386969300000004",
        lon: "-72.53018467326824",
        display_name:
          "University of Massachusetts Amherst, Natural Resources Road, Amherst, Hampshire County, Massachusetts, 01003, United States",
        class: "amenity",
        type: "university",
        importances: [
          0.37785773838607906, 0.3156855235667493, 0.3331588207658839, 0.40067458913730014, 0.3993654503168752,
        ],
      },
    ];

    fetchMock.enableMocks();
    fetchMock.mockResponse(JSON.stringify(res));

    const yesresult = await locationImportantEnough("someplace", 0.3);
    const noresult = await locationImportantEnough("someplace", 0.5);

    assert(yesresult === true);
    assert(noresult === false);

    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
});
