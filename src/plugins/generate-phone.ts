import { randomFromArray, randomIntFromInterval } from './utils.ts'

const countryCode = '+38'

const codes = [
  '050',
  '066',
  '095', 
  '099',
  '075',
  '039',
  '067',
  '068',
  '096',
  '097',
  '098',
  '077',
  '063',
  '073',
  '093',
  '089',
  '094'
]

const min = 1
const max = (10 ** 7) - 1

const generatePhone = (): string => {
  const operator = randomFromArray(codes)
  const number = randomIntFromInterval(min, max)
  return countryCode + operator + String(number)  
}


export default generatePhone
