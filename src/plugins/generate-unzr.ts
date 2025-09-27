import { randomIntFromInterval } from './utils.ts'

const min = 1
const max = (10 ** 9) - 1

const generateUnzr = () => {
  const number = randomIntFromInterval(min, max)
  return String(number).padStart(9, '0')
}

export default generateUnzr
