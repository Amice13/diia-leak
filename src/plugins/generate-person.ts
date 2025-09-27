import { getWithProbability } from './utils.ts'
import generateTaxId from './generate-tax-id.ts'
import generateEdrpou from './generate-edrpou.ts'
import generatePhone from './generate-phone.ts'
import getDataFromTaxId from './get-data-from-tax-id.ts'
import generateName from './generate-name.ts'
import generateDocument from './generate-document.ts'
import generateOrganization from './generate-organization-name.ts'
import generateEmail from './generate-email.ts'
import generateAddress from './generate-address.ts'

const values = [true, false]
const fopProbability = [0.07, 0.93]
const organizationProbability = [0.03, 0.97]

const generatePerson = () => {
  try {
    const taxId = generateTaxId()
    const phone = generatePhone()
    const { birthday, gender } = getDataFromTaxId(taxId) as { birthday: string, gender: string }
    const name = generateName(gender)
    const documentData = generateDocument(birthday)
    const email = generateEmail({ name })
    const address = generateAddress()

    const person: { [key: string]: any } = {
      address,
      birthday,
      name,
      gender,
      taxId,
      phone,
      email
    }
    Object.assign(person, documentData)

    const isFop = getWithProbability(values, fopProbability)
    if (isFop) {
      person.company = 'ФОП ' + person.name.toUpperCase()
      person.companyId = person.taxId
    }
    if (!isFop) {
      const isOrganizationManager = getWithProbability(values, organizationProbability)
      if (isOrganizationManager) {
        person.company = generateOrganization()
        person.companyId = generateEdrpou()
      }
    }
    if (person.passport) {
      const [passportSerie, passportNumber] = person.passport.split(' ')
      person.passportSerie = passportSerie
      person.passportNumber = passportNumber
    }

    return person
  } catch (err) {
    return false
  }
}

export default generatePerson
