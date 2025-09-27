interface PersonBaseData {
  isValid?: boolean
  result?: string
  age?: number
  gender?: string
  birthday?: string
}

const mult = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
const sourceDate = new Date('1899-12-31')

const getDataFromTaxId = (str: string | number | undefined): PersonBaseData => {
  if (str === undefined) return { isValid: false }
  const stringToCheck = String(str)
  if (!(/^\d{10}$/.test(stringToCheck))) return { isValid: false }
  // Get first five symbols
  let daysSinceBirthday = parseInt(stringToCheck.slice(0, 5))
  if (parseInt((stringToCheck[0] ?? '')) > 6) daysSinceBirthday = daysSinceBirthday - 63475
  // Get the numeric represntation of 1899-12-31 and add the number of days + 1
  const birthdaySource = new Date(sourceDate).setTime(sourceDate.getTime() + daysSinceBirthday * 24 * 3600 * 1000)
  // Return to ISO 9601
  const birthday = new Date(birthdaySource).toISOString().substr(0, 10)
  const age = new Date(Date.now() - new Date(birthday).getTime()).getUTCFullYear() - 1970
  const gender = parseInt(stringToCheck.slice(8, 9)) % 2 === 0 ? 'Female' : 'Male'
  const numbers = stringToCheck.slice(0, 9).split('').map(el => parseInt(el))
  const checkSum = numbers.reduce((acc, val, i) => acc + val * (mult[i] ?? 0), 0) % 11 % 10
  const result = parseInt(stringToCheck.slice(9, 10)) === checkSum ? 'success' : 'warning'
  return { result, birthday, gender, age }
}

export default getDataFromTaxId
