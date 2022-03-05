const getKwhPrice = (price: number, kwh: number): number => Math.round(price / kwh)
const getModulePrice = (price: number, moduleCount: number): number => price / moduleCount

export {getKwhPrice, getModulePrice}