import * as Types from '@Types'
import data from '../pages/api/data.json'

// Shuffle the items
const shuffle = (array: Types.ClothesProduct[]) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const getItems = () => {
  const { clothes } = data
  return shuffle(clothes)
}

export default getItems
