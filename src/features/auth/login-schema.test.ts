import { describe, expect, it } from "vitest";
import { loginSchema } from "@/features/auth/login-schema";

describe("loginSchema", () => {
  it("accepts valid credentials (positive)", () => {
    const parsed = loginSchema.parse({
      email: "user@lendsqr.com",
      password: "password1",
    });
    expect(parsed.email).toBe("user@lendsqr.com");
  });

  it("rejects invalid email (negative)", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "password1" });
    expect(result.success).toBe(false);
  });

  it("rejects short password (negative)", () => {
    const result = loginSchema.safeParse({ email: "user@lendsqr.com", password: "short" });
    expect(result.success).toBe(false);
  });
});
