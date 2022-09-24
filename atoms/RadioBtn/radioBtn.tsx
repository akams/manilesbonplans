import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { CheckIcon } from '@Assets/icons'
import { filterActions } from '@Store/filterSlice'

const Button = styled.button`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1px #bbb solid;
  border-radius: 20px;
  background-color: transparent;
  margin-right: 8px;
  cursor: pointer;

  &.checked {
    border-color: #4a00e0;
    background-color: #4a00e0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      stroke-width: 3;
    }
  }
`

//@ts-ignore
const RadioButton = ({ of }) => {
  //@ts-ignore
  const { category } = useSelector((state) => state.filter)
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (category === of) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [category, of])

  const clickHandler = () => {
    if (isChecked) {
      dispatch(filterActions.deselectCategory())
    } else {
      dispatch(filterActions.selectCategory(of))
    }
    setIsChecked((prevValue) => !prevValue)
  }

  return isChecked ? (
    <Button className="checked" onClick={clickHandler}>
      <CheckIcon />
    </Button>
  ) : (
    <Button onClick={clickHandler}></Button>
  )
}

export default RadioButton
