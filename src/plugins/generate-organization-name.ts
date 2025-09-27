import { faker } from '@faker-js/faker/locale/uk'

const generateOrganization = (): string => {
  return faker.company.name()
}

export default generateOrganization
