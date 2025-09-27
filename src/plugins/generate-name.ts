import { faker } from '@faker-js/faker/locale/uk'

const generateName = (personSex: string): string => {
  const sex = personSex.toLowerCase() as 'female' | 'male'
  let name = ''
  const patronymicRegex = /([иі]ч|[іиоеї]вна|[шч]на)$/

  while (true) {
    name = faker.person.fullName({ sex })
    const parts = name.trim().split(/\s+/) as [string, string, string]
    if (parts.length === 3 && patronymicRegex.test(parts[2]) && !patronymicRegex.test(parts[1])) {
      break
    }
  }
  return name
}

export default generateName
