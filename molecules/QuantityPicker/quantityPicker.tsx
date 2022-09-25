const QuantityPicker = ({ qteProductAvaiblable, currentQuantity, onSetQuantity }) => {
  const btns = [];
  for (let i = 1; i <= qteProductAvaiblable; i++) {
    btns.push(
      <button
        className={currentQuantity === `${i}` ? 'active' : ''}
        onClick={() => onSetQuantity(`${i}`)}
        key={i}
      >
        {i}
      </button>
    );
  }
  return (
    <>
      {btns}
    </>
  )
}

export default QuantityPicker
