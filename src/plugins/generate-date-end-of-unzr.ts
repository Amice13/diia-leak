const generateDateEndOfUnzr = (birthday: string, issuedDate: string): string => {
  const [year] = birthday.split('-').map(Number) as [number, number, number]
  const [issuedYear, issuedMonth, issuedDay] = issuedDate.split('-').map(Number) as [number, number, number]
  const currentYear = new Date().getFullYear()
  const difference = currentYear - year
  if (difference < 18) {
    const endDate = new Date(issuedYear + 4, issuedMonth, issuedDay)
    return endDate.toISOString().split('T')[0] as string
  }
  const endDate = new Date(issuedYear + 10, issuedMonth, issuedDay)
  return endDate.toISOString().split('T')[0] as string  
}

export default generateDateEndOfUnzr
