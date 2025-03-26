import React from "react";

export const EmptyString = "—";
export const NoDataString = "Н/д";
export const EmptyData = " — ";

export const isDefined = (value: React.ReactNode) =>
  value !== null && value !== undefined && value !== "";

export function printDefined(value: string | number): string | number {
  return isDefined(value) ? value : EmptyString;
}
