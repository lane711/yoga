import { add, getKey } from "./data";
describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(add(10, 5)).toBe(15);
  });
  it("should return 5 for add(2,3)", () => {
    expect(add(2, 3)).toBe(5);
  });
});

it("should generate a key", () => {
  const key = getKey("site", "module");
  expect(key.startsWith("site::module")).toBe(true);
  expect(key.length).toBe(40);

});
