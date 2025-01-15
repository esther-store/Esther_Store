import { describe, expect, it } from "vitest";
import { validatePassword } from "../validatePassword";

describe("validatePassword", () => {
    it("should return an error if the password is less than 8 characters", () => {
        expect(validatePassword("Ab1")).toBe("La contraseña debe tener al menos 8 caracteres");
        expect(validatePassword("Abc1")).toBe("La contraseña debe tener al menos 8 caracteres");
        expect(validatePassword("Abcdef7")).toBe("La contraseña debe tener al menos 8 caracteres");
    });

    it("should return an error if the password does not contain at least one number", () => {
        expect(validatePassword("Abcdefgh")).toBe("La contraseña debe contener al menos un número, una letra y una mayúscula");
    });

    it("should return an error if the password does not contain at least one lowercase letter", () => {
        expect(validatePassword("ABCDEFG1")).toBe("La contraseña debe contener al menos un número, una letra y una mayúscula");
    });

    it("should return an error if the password does not contain at least one uppercase letter", () => {
        expect(validatePassword("abcdefg1")).toBe("La contraseña debe contener al menos un número, una letra y una mayúscula");
    });

    it("should return 'ok' for valid passwords", () => {
        expect(validatePassword("Abcdefg1")).toBe("ok");
        expect(validatePassword("Password123")).toBe("ok");
        expect(validatePassword("ValidPass1")).toBe("ok");
    });
});