import { faker } from '@faker-js/faker/locale/uk'
import { getWithProbability } from './utils.ts'
import translit from './translit.ts'

interface Person {
  name: string
}

const strategies = [
  'random',
  'byName',
  'byFullName'
]

const strategyProbabilities = [
  0.1,
  0.5,
  0.4
]

const emailProviders = [
  'gmail.com',
  'outlook.com',
  'icloud.com',
  'protonmail.com',
  'aol.com'
]

const providerProbabilities = [
  0.7,
  0.1,
  0.1,
  0.07,
  0.03
]

const generateEmail = (person: Person): string => {
  const selectedStrategy = getWithProbability(strategies, strategyProbabilities)
  const provider = getWithProbability(emailProviders, providerProbabilities)
  if (selectedStrategy === 'random') return faker.internet.email({ provider })
  const [familyName, givenName] = person.name.split(' ') as [string, string]
  if (selectedStrategy === 'byName') {
    return faker.internet.email({
      firstName: translit(familyName),
      provider
    })
  }
  return faker.internet.email({
    firstName: translit(familyName),
    lastName: translit(givenName),
    provider
  })
}

export default generateEmail
