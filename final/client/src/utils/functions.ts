const getKwhPrice = (price: number, kwh: number): number => Math.round(price / kwh)

const getModulePrice = (price: number, moduleCount: number): number => price / moduleCount

const estimateSOH = (years: number, milesThousands: number): number => {
  const driveWear = milesThousands / 150 / 2
  // eg. 27/150/2 = .09
  const ageWear = years / 12 / 2
  // eg. 5/12/2 = .21
  return Math.round((1 - driveWear - ageWear) * 100)
}
export {getKwhPrice, getModulePrice, estimateSOH}