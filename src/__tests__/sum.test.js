import { screen } from "@testing-library/dom";
import { sum } from "../sum";

it("should do", () => {
  expect(sum(2, 3)).toBe(4);
});
