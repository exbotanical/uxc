/** @todo Update to use Temporal API  */
// import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';

export function toReadable(date: Date) {
  const given = new Date(date)

  if (isToday(given)) {
    return `at ${dateTo12Hour(given)}`
  } else if (isYesterday(given)) {
    return `Yesterday at ${dateTo12Hour(given)}`
  }

  return `at ${dateTo12Hour(given)}`
}

export function dateTo12Hour(date: Date) {
  let hours = date.getHours()
  let minutes: number | string = date.getMinutes()
  const meridiem = hours >= 12 ? 'pm' : 'am'

  hours %= 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? `0${minutes}` : minutes

  const strTime = `${hours}:${minutes} ${meridiem}`
  return strTime
}

export function isToday(date: Date) {
  const today = new Date()

  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  )
}

export function isYesterday(date: Date) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return yesterday.toDateString() === date.toDateString()
}
