import { describe, expect, it } from "vitest";
import { filterUsersByQuery } from "@/lib/users/users-api";
import { generateUserCatalog } from "@/lib/users/mock-user-data";

describe("filterUsersByQuery", () => {
  const catalog = generateUserCatalog(500);

  it("returns all users when no filters are applied (positive)", () => {
    const filtered = filterUsersByQuery(catalog, {});
    expect(filtered).toHaveLength(500);
  });

  it("filters by organization substring (positive)", () => {
    const filtered = filterUsersByQuery(catalog, { organization: "lendsqr" });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((u) => u.organization.toLowerCase().includes("lendsqr"))).toBe(true);
  });

  it("filters by status (positive)", () => {
    const filtered = filterUsersByQuery(catalog, { status: "active" });
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((u) => u.status === "active")).toBe(true);
  });

  it("returns empty when username cannot match (negative)", () => {
    const filtered = filterUsersByQuery(catalog, { username: "___does_not_exist___" });
    expect(filtered).toHaveLength(0);
  });
});
