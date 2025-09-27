import { getWithProbability } from './utils.ts'
import generatePassport from './generate-passport.ts'
import generateUnzr from './generate-unzr.ts'
import generateIssuer from './generate-issuer.ts'
import generateDateOfUnzr from './generate-date-of-unzr.ts'
import generateDateEndOfUnzr from './generate-date-end-of-unzr.ts'
import generateDatePassportIssued from './generate-date-passport-issued.ts'

const documentTypes = ['passoport', 'idCard']
const probabilities = [0.7, 0.3]

const yearOfRequiredIdCard = 2016 - 14

const generateDocument = (birthday: string): Object => {
  const year = parseInt(birthday.split('-')[0] as string)
  if (year > yearOfRequiredIdCard) {
    const unzr = generateUnzr()
    const unzrIssuer = generateIssuer('idCard')
    const unzrIssued = generateDateOfUnzr(birthday)
    const unzrEnd = generateDateEndOfUnzr(birthday, unzrIssued)
    return { unzr, unzrIssuer, unzrIssued, unzrEnd }
  }
  const documentType = getWithProbability(documentTypes, probabilities)
  if (documentType === 'idCard') {
    const unzr = generateUnzr()
    const unzrIssuer = generateIssuer(documentType)
    const unzrIssued = generateDateOfUnzr(birthday)
    const unzrEnd = generateDateEndOfUnzr(birthday, unzrIssued)
    return { unzr, unzrIssuer, unzrIssued, unzrEnd }
  }
  const passport = generatePassport()
  const passportIssuer = generateIssuer(documentType)
  const passportIssued = generateDatePassportIssued(birthday)
  return { passport, passportIssuer, passportIssued }
}

export default generateDocument
