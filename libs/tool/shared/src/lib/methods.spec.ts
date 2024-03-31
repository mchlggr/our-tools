import {clickTool} from './methods'
describe("clickTool Function", () => {
it("should return first argument", () => {
  const result = clickTool("tool:test", {}, {}, {})
  expect(result).toEqual({})
})
})
