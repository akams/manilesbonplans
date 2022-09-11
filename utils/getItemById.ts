import data from '@Api/data.json'

const getItemById = (itemId: number|string) => {
  return data.clothes.find((item) => item.id === itemId)
}

export default getItemById
