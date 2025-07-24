import { jest } from "@jest/globals";
import assert from "assert";
import { fetchUMichWeather, fetchUMassWeather, fetchUniversityWeather, trans_name } from "./universityWeather.js";

const SECOND = 1000;
jest.setTimeout(40 * SECOND);

describe("fetchUMichWeather", () => {
  // TODO
  it("Umich weather returns correct attributes", async () => {
    const res = await fetchUMichWeather();
    assert(typeof res.totalAverage === "number");
    assert(Object.keys(res).includes("University of Michigan-Flint"));
    assert(Object.keys(res).includes("University of Michigan - Dearborn"));
    assert(Object.keys(res).includes("University of Michigan - Ann Arbor"));
    assert(Object.keys(res).includes("totalAverage"));
    assert(Object.keys(res).length === 4);
  });
});

describe("fetchUMassWeather", () => {
  it("UMass weather returns correct attributes", async () => {
    const res = await fetchUMassWeather();
    assert(typeof res.totalAverage === "number");
    assert(Object.keys(res).includes("University of Massachusetts at Amherst"));
    assert(Object.keys(res).includes("University of Massachusetts at Lowell"));
    assert(Object.keys(res).includes("University of Massachusetts Boston"));
    assert(Object.keys(res).includes("University of Massachusetts at Dartmouth"));
    assert(Object.keys(res).includes("totalAverage"));
    assert(Object.keys(res).length === 5);
  });
});

describe("fetchUniversityWeather", () => {
  // TODO
  it("should correctly give the average temperatures without trans_name", async () => {
    const res = await fetchUniversityWeather("University of Miami");
    assert(typeof res.totalAverage === "number");
    assert(typeof res["University of Miami"] === "number");
    assert(Object.keys(res).includes("University of Miami"));
    assert(Object.keys(res).includes("totalAverage"));
  });

  it("should correctly give the average temperatures with trans_name", async () => {
    const res = await fetchUniversityWeather("University of Massachusetts", trans_name);
    assert(typeof res.totalAverage === "number");
    assert(Object.keys(res).includes("University of Massachusetts at Amherst"));
    assert(Object.keys(res).includes("University of Massachusetts at Lowell"));
    assert(Object.keys(res).includes("University of Massachusetts Boston"));
    assert(Object.keys(res).includes("University of Massachusetts at Dartmouth"));
    assert(Object.keys(res).includes("totalAverage"));
    assert(Object.keys(res).length === 5);
  });
});
