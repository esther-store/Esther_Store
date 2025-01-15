import { describe, expect, it } from "vitest";
import { applyDiscount } from "../applyDiscount";

describe("applyDiscount", () => { 
    it("should return the price if no promotion and discount is passed", () => {
        expect(applyDiscount({price: 50})).toBe(50);
    });

    it("should apply discounts", () => {
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 10, discount: 5})).toBe(85);
        expect(applyDiscount({price: 100, discount: 10})).toBe(90);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 10})).toBe(90);
    });

    it("should handle zero price", () => {
        expect(applyDiscount({price: 0, promotionDiscountInPercent: 10, discount: 5})).toBe(0);
    });

    it("should handle zero discounts", () => {
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 10, discount: 0})).toBe(90);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 0, discount: 10})).toBe(90);
    });

    it("should handle discounts as null", () => {
        expect(applyDiscount({price: 100, promotionDiscountInPercent: null, discount: null})).toBe(100);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 10, discount: null})).toBe(90);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: null, discount: 10})).toBe(90);
    });

    it("should return 0 on negative price", () => {
        expect(applyDiscount({price: -100, promotionDiscountInPercent: 10, discount: 5})).toBe(0);
    });

    it("should evoid applying negative discounts", () => {
        expect(applyDiscount({price: 100, promotionDiscountInPercent: -10, discount: -5})).toBe(100);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 10, discount: -5})).toBe(90);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: -10, discount: 5})).toBe(95);
    });

    it("should handle large discounts", () => {
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 50, discount: 50})).toBe(0);
    });

    it("should evoid apply discounts greater than 100%", () => {
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 110, discount: 10})).toBe(90);
        expect(applyDiscount({price: 100, promotionDiscountInPercent: 10, discount: 150})).toBe(90);
    });
});