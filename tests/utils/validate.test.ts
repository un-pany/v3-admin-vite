import { describe, expect, it } from "vitest"
import { isArray } from "@/utils/validate"

describe("isArray", () => {
  it("String", () => {
    expect(isArray("")).toBe(false)
  })
  it("Number", () => {
    expect(isArray(1)).toBe(false)
  })
  it("Boolean", () => {
    expect(isArray(true)).toBe(false)
  })
  it("Null", () => {
    expect(isArray(null)).toBe(false)
  })
  it("Undefined", () => {
    expect(isArray(undefined)).toBe(false)
  })
  it("Symbol", () => {
    expect(isArray(Symbol())).toBe(false)
  })
  it("BigInt", () => {
    expect(isArray(BigInt(1))).toBe(false)
  })
  it("Object", () => {
    expect(isArray({})).toBe(false)
  })
  it("Array Object", () => {
    expect(isArray([])).toBe(true)
  })
})
