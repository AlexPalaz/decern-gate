import { describe, it, expect } from "vitest";
import { extractDecisionIds, isDecisionRequired } from "./main";

describe("extractDecisionIds", () => {
  it("extracts id from decern:, DECERN-, and /decisions/ URL", () => {
    expect(extractDecisionIds("decern:abc_123")).toContain("abc_123");
    expect(extractDecisionIds("DECERN-xyz")).toContain("xyz");
    expect(extractDecisionIds("https://app.example.com/decisions/kkk-111")).toContain("kkk-111");
  });
  it('"decern:abc_123" -> contains "abc_123"', () => {
    expect(extractDecisionIds("decern:abc_123")).toContain("abc_123");
  });

  it('"DECERN-xyz" -> contains "xyz"', () => {
    expect(extractDecisionIds("DECERN-xyz")).toContain("xyz");
  });

  it('"https://x.y/decisions/kkk-111" -> contains "kkk-111"', () => {
    expect(extractDecisionIds("https://x.y/decisions/kkk-111")).toContain("kkk-111");
  });

  it("extracts ADR refs (e.g. ADR-001, ADR-123)", () => {
    expect(extractDecisionIds("See ADR-001 for context")).toContain("ADR-001");
    expect(extractDecisionIds("decern:ADR-042")).toContain("ADR-042");
    expect(extractDecisionIds("Implements ADR-123 and ADR-456")).toEqual(
      expect.arrayContaining(["ADR-123", "ADR-456"])
    );
  });
});

describe("isDecisionRequired", () => {
  it("supabase/migrations => required true, README.md => not required", () => {
    expect(isDecisionRequired(["supabase/migrations/1.sql"]).required).toBe(true);
    expect(isDecisionRequired(["README.md"]).required).toBe(false);
  });
  it('["supabase/migrations/1.sql"] => required true', () => {
    const r = isDecisionRequired(["supabase/migrations/1.sql"]);
    expect(r.required).toBe(true);
  });

  it('["README.md"] => required false', () => {
    const r = isDecisionRequired(["README.md"]);
    expect(r.required).toBe(false);
  });
});
