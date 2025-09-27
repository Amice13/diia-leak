import { addWorkingDayOffset } from './utils.ts'

const ageBoundary = new Date().getFullYear() - 2002

export const generateDateOfUnzr = (birthday: string): string => {
  const [year, month, day] = birthday.split('-').map(Number) as [number, number, number]
  const currentYear = new Date().getFullYear()
  const age = currentYear - year

  let issuedDate: Date

  if (age < 18) {
    // first passport at 14, within 90 days
    issuedDate = addWorkingDayOffset(new Date(year + 14, month - 1, day), 0, 90)
    return issuedDate.toISOString().split('T')[0] as string
  }
  let addYears = age < ageBoundary ? 14 : 16
  if (age > 45) addYears = 45
  if (age > 25 && age <= 45) addYears = 25
  if (age < 25) addYears = 16

  const issuedYear = currentYear - ((age + addYears) % 10)
  issuedDate = addWorkingDayOffset(new Date(issuedYear, month - 1, day), -90, 90)
  return issuedDate.toISOString().split('T')[0] as string
}

export default generateDateOfUnzr
