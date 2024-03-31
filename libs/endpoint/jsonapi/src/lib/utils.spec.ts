import { mergeParams } from "./utils"; // Correct the path as appropriate
import { JsonApiQuery} from "./types";

describe("mergeParams Function", () => {
  it("should correctly merge two JsonApiQuery objects", () => {
    const objValue: JsonApiQuery = {
      include: new Set(["include1", "include2"]),
      fields: { key1: "value1" },
      filter: { key1: "value1" },
      page: 1,
      per_page: 10,
      sort: ["a"],
    };

    const srcValue: JsonApiQuery = {
      include: new Set(["include1", "include3"]),
      fields: { key2: "value2" },
      filter: { key2: "value2" },
      page: 2,
      per_page: 20,
      sort: ["-b"],
    };

    // Adjust expectedValue as per behavior of mergeSort, mergePage, mergeIncludes, mergeFilters
    const expectedValue: JsonApiQuery = {
      include: new Set(["include1" ,"include2", "include3"]),
      fields: { key2: "value2" }, // Fields are overridder
      filter: { key1: "value1", key2: "value2" },
      page: 1,
      per_page: 20,
      sort: ["a", "-b"],
    };

    const result = mergeParams(objValue, srcValue);

    console.log('expectedValue', expectedValue)
    console.log('result', result)

    expect(result).toEqual(expectedValue);
  });
});
