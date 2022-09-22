
export const formatDataProducts = ({ idDocument, imgSrc, type, price, ...product }: any) => {
  const [directory, filename] = imgSrc.split("/");
  const templateString = `/${directory}%2F${filename}`;
  // price
  const [currency, amount] = price.split(" ");
  return {
    ...product,
    amount: Number(amount.replace(",", ".")),
    currency,
    category: type,
    imageURL: `https://firebasestorage.googleapis.com/v0/b/manilesbonsplans-22c99.appspot.com/o${templateString}?alt=media`,
  };
}