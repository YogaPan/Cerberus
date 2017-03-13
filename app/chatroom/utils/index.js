export function getTimeString() {
  const date = new Date
  let hourString = date.getHours().toString()
  let minuteString = date.getMinutes().toString()

  if (hourString.length === 1) {
    hourString = `0${hourString}`;
  }

  if (minuteString.length === 1) {
    minuteString = `0${minuteString}`;
  }

  return `${hourString}:${minuteString}`
}
