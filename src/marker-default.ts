export function markerDefault<T extends string | string[]>(key: T, defaultValue: string): T {
  return key;
}