import { describe, expect, it } from "vitest";
import { formatNaira } from "@/lib/format/format-naira";

describe("formatNaira", () => {
  it("formats whole naira amounts (positive)", () => {
    expect(formatNaira(200_000)).toContain("200,000");
  });
});
