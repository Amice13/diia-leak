import Papa from 'papaparse'
import generatePerson from './generate-person.ts'

const dict = [
  'email',
  'name',
  'birthday',
  'phone',
  'taxId',
  'address',
  'passportSerie',
  'passportNumber',
  'passportIssued',
  'passportIssuer',
  'unzr',
  'unzrIssued',
  'unzrIssuer',
  'unzrEnd',
  'company',
  'companyId'
]

const headers = [
  'Почта',
  'ФИО',
  'Дата рождения',
  'Телефон',
  'Идентификационный номер',
  'Улица и дом',
  'Серия паспорта',
  'Номер паспорта',
  'Дата выдачи паспорта',
  'Кем выдан паспорт',
  'Номер ID карты',
  'Дата выдачи ID карты',
  'Кем выдана ID карта',
  'Дата окончания действия ID карты',
  'Организация',
  'Код организации'
]

const encoder = new TextEncoder()

self.onmessage = e => {
  let { rows = 1000 } = e.data

  const headerCsv = headers.join(',') + '\n'
  postMessage({ chunk: encoder.encode(headerCsv).buffer }, [encoder.encode(headerCsv).buffer] as WindowPostMessageOptions)

  for (let i = 0; i < rows; i++) {
    const person = generatePerson()
    if (!person) {
      rows++
      continue
    }
    const recoded = dict.map(key => person[key])
    // Papa only needs an array with 1 row to append
    const csv = Papa.unparse([recoded], { header: false }) + '\n'
    const buffer = encoder.encode(csv).buffer
    postMessage({ chunk: buffer }, [buffer] as WindowPostMessageOptions)
  }

  // Signal completion
  postMessage({ done: true })
}
