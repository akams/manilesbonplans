import * as Types from '@Types'

export const getSizeAvailable = (sizeProduct: Types.Size) => {
  return Object.entries(sizeProduct).reduce((previous: string[], current: any) => {
    const [key, value] = current
    if (value) {
      previous.push(key)
    }
    return previous
  }, [])
}

export const getQteBySize = (size: string | number, sizeProduct: Types.Size): string | number => {
  return sizeProduct[size]
}
