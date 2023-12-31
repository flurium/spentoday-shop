import { dev } from "$app/environment"

export * from "./fetch"
export * as errors from "./errors"

export function fromJson<T>(str: string) {
  try {
    return JSON.parse(str) as T
  } catch {
    return null
  }
}

export function toJson(data: any) {
  try {
    return JSON.stringify(data)
  } catch {
    return null
  }
}

export function getDomain(url: URL) {
  return dev ? "free.spentoday.com" : url.hostname
}
