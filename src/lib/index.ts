export * from "./fetch";

export function fromJson<T>(str: string) {
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}

export function toJson(data: any) {
  try {
    return JSON.stringify(data);
  } catch {
    return null;
  }
}
