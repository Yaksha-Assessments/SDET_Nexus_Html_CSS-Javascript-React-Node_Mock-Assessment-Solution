import {
    validateRequired,
    validateEmail,
    validateNumber,
    validateMinLength,
    validateMaxLength
} from "../../utils/validation";

describe("boundary", () => {
    test("ValidationFunctionsComponent boundary validateRequired returns true for non-empty string", () => {
        expect(validateRequired("Hello")).toBe(true);
    });

    test("ValidationFunctionsComponent boundary validateRequired returns false for empty string", () => {
        expect(validateRequired("")).toBe(false);
    });

    test("ValidationFunctionsComponent boundary validateEmail returns true for valid email address", () => {
        expect(validateEmail("test@example.com")).toBe(true);
    });

    test("ValidationFunctionsComponent boundary validateEmail returns false for invalid email address", () => {
        expect(validateEmail("invalid-email")).toBe(false);
    });

    test("ValidationFunctionsComponent boundary validateNumber returns true for valid number", () => {
        expect(validateNumber("12345")).toBe(true);
    });

    test("ValidationFunctionsComponent boundary validateNumber returns false for invalid number", () => {
        expect(validateNumber("123abc")).toBe(false);
    });

    test("ValidationFunctionsComponent boundary validateMinLength returns true when string length is greater than or equal to minLength", () => {
        expect(validateMinLength("Hello", 3)).toBe(true);
        expect(validateMinLength("Hello", 5)).toBe(true);
    });

    test("ValidationFunctionsComponent boundary validateMinLength returns false when string length is less than minLength", () => {
        expect(validateMinLength("Hi", 3)).toBe(false);
    });

    test("ValidationFunctionsComponent boundary validateMaxLength returns true when string length is less than or equal to maxLength", () => {
        expect(validateMaxLength("Hello", 10)).toBe(true);
        expect(validateMaxLength("Hello", 5)).toBe(true);
    });

    test("ValidationFunctionsComponent boundary validateMaxLength returns false when string length is greater than maxLength", () => {
        expect(validateMaxLength("Hello", 4)).toBe(false);
    });
});
