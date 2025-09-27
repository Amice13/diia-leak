import { randomFromArray, randomIntFromInterval } from './utils.ts'

const availableLetters = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ж',
  'З',
  'І',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ч',
  'Ш',
  'Щ',
  'Ю',
  'Я'
]

const generateSerie = (): string => {
  return randomFromArray(availableLetters) + randomFromArray(availableLetters)
}

const minPassport = 1
const maxPassport = (10 ** 6) - 1

const generateNumber = (): string => {
  const number = randomIntFromInterval(minPassport, maxPassport)
  const stringNumber = String(number).padStart(6, '0')
  return generateSerie() + ' ' + stringNumber
}

export default generateNumber
