import { jest } from "@jest/globals";
import assert from "assert";
import { fetchUniversities, universityNameLengthOrderAscending } from "./fetchUniversities.js";
import fetchMock from "jest-fetch-mock";

const SECOND = 1000;
jest.setTimeout(10 * SECOND);

describe("fetchUniversities", () => {
  it("returns correct array for 'University of Massachusetts'", async () => {
    const res = await fetchUniversities("University of Massachusetts");
    assert(res.includes("University of Massachusetts Boston"));
    assert(res.includes("University of Massachusetts at Amherst"));
    assert(res.includes("University of Massachusetts at Lowell"));
    assert(res.includes("University of Massachusetts at Dartmouth"));
    assert(Array.isArray(res));
    assert(res.length === 4);
  });

  it("returns empty array", async () => {
    const res = await fetchUniversities("abcd");
    expect(res.length).toEqual(0);
    assert(Array.isArray(res));
  });

  it("returns error for not ok", async () => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });
    await expect(fetchUniversities("University of Massachusetts")).rejects.toThrow();
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
  it("returns error for catch", async () => {
    fetchMock.enableMocks();
    fetchMock.mockReject(new Error("caught error"));
    await expect(fetchUniversities("University of Massachusetts")).rejects.toThrow();
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
});

describe("universityNameLengthOrderAscending", () => {
  const dat = [
    {
      name: "University of Massachusetts at Amherst",
      "state-province": null,
      domains: ["umass.edu"],
      web_pages: ["http://www.umass.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
    {
      name: "University of Massachusetts Boston",
      "state-province": null,
      domains: ["umb.edu"],
      web_pages: ["https://www.umb.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },

    {
      name: "University of Massachusetts at Dartmouth",
      "state-province": null,
      domains: ["umassd.edu"],
      web_pages: ["http://www.umassd.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
    {
      name: "University of Massachusetts at Lowell",
      "state-province": null,
      domains: ["uml.edu", "student.uml.edu"],
      web_pages: ["http://www.uml.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
  ];
  const dat2 = [
    {
      name: "University of Massachusetts Boston",
      "state-province": null,
      domains: ["umb.edu"],
      web_pages: ["https://www.umb.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
    {
      name: "University of Massachusetts at Lowell",
      "state-province": null,
      domains: ["uml.edu", "student.uml.edu"],
      web_pages: ["http://www.uml.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
    {
      name: "University of Massachusetts at Amherst",
      "state-province": null,
      domains: ["umass.edu"],
      web_pages: ["http://www.umass.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
    {
      name: "University of Massachusetts at Dartmouth",
      "state-province": null,
      domains: ["umassd.edu"],
      web_pages: ["http://www.umassd.edu/"],
      alpha_two_code: "US",
      country: "United States",
    },
  ];
  it("true for empty array", async () => {
    const res = await universityNameLengthOrderAscending("abcde");
    expect(res).toEqual(true);
  });
  it("true for array of length one", async () => {
    const res = await universityNameLengthOrderAscending("university of massachusetts Boston");
    expect(res).toEqual(true);
  });

  it("returns false for non ascending array", async () => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify(dat));
    const res = await universityNameLengthOrderAscending("university of mass");
    expect(res).toEqual(false);
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
  it("returns true for  ascending array", async () => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify(dat2));
    const res = await universityNameLengthOrderAscending("university of mass");
    expect(res).toEqual(true);
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
  it("catches error", async () => {
    fetchMock.enableMocks();
    fetchMock.mockReject(new Error("caught error"));
    await expect(universityNameLengthOrderAscending("University of Massachusetts")).rejects.toThrow();
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
  it("catches error when not ok", async () => {
    fetchMock.enableMocks();
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });
    await expect(universityNameLengthOrderAscending("University of Massachusetts")).rejects.toThrow();
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
});
