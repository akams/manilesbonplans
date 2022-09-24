const SizePickerForBottoms = ({ sizeListAvaiblable, currentSize, onSetSize }) => {
  return (
    <>
      {sizeListAvaiblable.map((size, index) => (
        <button
          className={currentSize === size.toString() ? 'active' : ''}
          onClick={() => onSetSize(`${size}`)}
          key={index}
        >
          {size}
        </button>
      ))}
    </>
  )
}

export default SizePickerForBottoms
