const mult = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
const sourceDate = new Date('1899-12-31')
const today = new Date()
const minDate = new Date(new Date().setFullYear(today.getFullYear() - 100))
const maxDate = new Date(new Date().setFullYear(today.getFullYear() - 16))
const minNumber = Math.floor((Number(minDate) - Number(sourceDate)) / (1000 * 60 * 60 * 24))
const maxNumber = Math.floor((Number(maxDate) - Number(sourceDate)) / (1000 * 60 * 60 * 24))

function randomIntFromInterval (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateTaxId = (): string => {
  const start = String(randomIntFromInterval(minNumber, maxNumber)).padStart(5, '0')
  const middle = String(randomIntFromInterval(0, 999)).padStart(3, '0')
  const finish = String(randomIntFromInterval(0, 1))
  const number9 = start + middle + finish
  const numbers = number9.split('').map(el => parseInt(el))
  const checkSum = numbers.reduce((acc, val, i) => acc + val * (mult[i] ?? 0), 0) % 11 % 10
  return number9 + String(checkSum)
}

export default generateTaxId
