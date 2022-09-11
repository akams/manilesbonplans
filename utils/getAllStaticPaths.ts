import data from '@Api/data.json'

const getAllStaticPaths = () => {
  return data.clothes.map((item) => ({
    params: { cid: item.id },
  }))
}

export default getAllStaticPaths
