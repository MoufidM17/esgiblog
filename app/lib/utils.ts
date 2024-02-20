export const convertDateToString = (value: Date) : string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    // return d.toLocaleDateString("fr-FR", options)
    return value.toLocaleString("fr-FR", options)
}

export const toUppercaseFirstChar = (value: string | null): string  => {
    return value ? value.charAt(0).toLocaleUpperCase().concat(value.slice(1)) : ""
}