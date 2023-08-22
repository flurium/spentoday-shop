import type { HandleServerError } from "@sveltejs/kit"

export const handleError: HandleServerError = () => {
  return {
    message: "Сталася неочікувана помилка. Зараз полагодимо."
  }
}
