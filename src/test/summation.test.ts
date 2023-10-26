import {sum} from "../app/summation";

describe("Summation File", () => {
    it("Should be summation 2 number", () => {
        const result = sum(2, 5);
        expect(result).toBe(7);
    });
});
