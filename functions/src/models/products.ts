
export const formatDataProducts = ({ idDocument, imgSrc, ...product }: any) => {
  const [directory, filename] = imgSrc.split("/");
  const templateString = `/${directory}%2F${filename}`;
  return {
    ...product,
    imageURL: `https://firebasestorage.googleapis.com/v0/b/manilesbonsplans-22c99.appspot.com/o${templateString}?alt=media`,
  };
}