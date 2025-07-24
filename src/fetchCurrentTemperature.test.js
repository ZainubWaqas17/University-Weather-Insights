import { jest } from "@jest/globals";
import fetchMock from "jest-fetch-mock";
import { fetchCurrentTemperature, tempAvgAboveAtCoords } from "./fetchCurrentTemperature.js";

const SECOND = 1000;
jest.setTimeout(30 * SECOND);

describe("fetchCurrentTemperature", () => {
  // TODO
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  it("should correctly give the temperature on fetch", async () => {
    const mData = {
      hourly: {
        time: ["2024-04-30T00:00", "2024-04-30T01:00"],
        temperature_2m: [53.8, 52.9],
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mData));
    const point = { latitude: 40, longitude: 40 };
    const expected = {
      time: mData.hourly.time,
      temperature_2m: mData.hourly.temperature_2m,
    };
    const outcome = await fetchCurrentTemperature(point);
    expect(outcome).toEqual(expected);
  });

  it("should give an error accordingly", async () => {
    fetchMock.mockResponseOnce("", { status: 404, statusText: "Not Found" });
    const point = { latitude: 75, longitude: 105 };
    await expect(fetchCurrentTemperature(point)).rejects.toThrow("HTTP error, status = 404: Not Found");
  });

  it("should handle fetch errors", async () => {
    fetchMock.mockReject(new Error("failed to fetch"));
    const point = { latitude: 80, longitude: 20 };
    await expect(fetchCurrentTemperature(point)).rejects.toThrow("failed to fetch temp: failed to fetch");
  });

  afterEach(() => {
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
});

describe("tempAvgAboveAtCoords", () => {
  // TODO
  beforeEach(() => {
    fetchMock.enableMocks();
  });
  it("should return true if avg temperature is above the threshold", async () => {
    const mTest = {
      hourly: {
        time: ["2022-01-01T00:00:00Z", "2022-01-01T01:00:00Z", "2022-01-01T02:00:00Z"],
        temperature_2m: [5, 18, 55],
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mTest));

    const outcome = await tempAvgAboveAtCoords({ lat: 10, lon: 60 }, 5);
    expect(outcome).toBe(true);
  });

  it("should return false if avg temperature is below the threshold", async () => {
    const mTest = {
      hourly: {
        time: ["2022-01-01T00:00:00Z", "2022-01-01T01:00:00Z", "2022-01-01T02:00:00Z"],
        temperature_2m: [5, 18, 55],
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mTest));

    const outcome = await tempAvgAboveAtCoords({ lat: 10, lon: 50 }, 80);
    expect(outcome).toBe(false);
  });

  it("should throw an error for empty array", async () => {
    const mTest = { hourly: { time: [], temperature_2m: [] } };
    fetchMock.mockResponseOnce(JSON.stringify(mTest));
    await expect(tempAvgAboveAtCoords({ lat: 100, lon: 50 }, 80)).rejects.toThrow("temperature data unavailable");
  });

  it("should properly handle fetch errors", async () => {
    fetchMock.mockReject(new Error("fetch failure"));
    await expect(tempAvgAboveAtCoords({ lat: 70, lon: 20 }, 40)).rejects.toThrow("failed to fetch temp");
  });
  afterEach(() => {
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });
});
