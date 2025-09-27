export const randomFromArray = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getWithProbability = (items: any[], probs: number[]) => {
  const r = Math.random()
  let cumulative = 0
  for (let i = 0; i < items.length; i++) {
    cumulative += (probs[i] ?? 0)
    if (r < cumulative) return items[i]
  }
}

export const addWorkingDayOffset = (date: Date, min: number, max: number): Date => {
  const d = new Date(date)
  d.setDate(d.getDate() + randomIntFromInterval(min, max))
  const day = d.getDay()
  if (day === 6) d.setDate(d.getDate() + randomIntFromInterval(2, 6))
  if (day === 0) d.setDate(d.getDate() + randomIntFromInterval(1, 5))
  return d
}
