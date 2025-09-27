import { randomIntFromInterval } from './utils.ts'

const minNumber = 1
const maxNumber = (10 ** 8) - 1

const boundCoefficients = [1, 2, 3, 4, 5, 6, 7]
const middleCoefficients = [7, 1, 2, 3, 4, 5, 6]

const lowerBound = 3 * (10 ** 7)
const upperBound = 6 * (10 ** 7)

const generateEdrpou = (): string => {
  const number = randomIntFromInterval(minNumber, maxNumber)
  const isSpecific = number > lowerBound && number < upperBound
  let partialCode = String(number).padStart(7, '0')
  const numbers = String(partialCode).split('').map(x => parseInt(x))
  const coefficients = isSpecific ? middleCoefficients : boundCoefficients
  let sum = coefficients.reduce((acc, val, i) => acc + val * (numbers[i] ?? 0), 0)
  let result = sum % 11
  if (result === 10) {
    sum = coefficients.reduce((acc, val, i) => acc + val * ((numbers[i] ?? 0) + 2), 0)
    result = sum % 11 % 10
  }
  return partialCode + result
}

export default generateEdrpou
