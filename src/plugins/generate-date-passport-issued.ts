import { addWorkingDayOffset } from './utils.ts'

const generateDatePassportIssued = (birthday: string): string => {
  const [year, month, day] = birthday.split('-').map(Number) as [number, number, number]
  const currentYear = new Date().getFullYear()
  const difference = currentYear - year
  let issuedDate = new Date()
  if (difference > 45) issuedDate = addWorkingDayOffset(new Date(year + 45, month - 1, day), 0, 120)
  if (difference > 25) issuedDate = addWorkingDayOffset(new Date(year + 25, month - 1, day), 0, 120)
  if (difference < 25) issuedDate = addWorkingDayOffset(new Date(year + 16, month - 1, day), 0, 90)
  return issuedDate.toISOString().split('T')[0] as string
}

export default generateDatePassportIssued
