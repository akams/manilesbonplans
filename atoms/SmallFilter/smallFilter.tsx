import { useState } from 'react'
import styled from 'styled-components'

import { FilterIcon } from '@Assets/icons'
import { BrandFilter, Modal, CategoryFilter } from '@Atoms'

const Button = styled.button`
  color: inherit;
  background-color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-right: 8px;
  cursor: pointer;
`

const ModalDiv = styled.div`
  padding: 16px;
  overflow-y: scroll;
  height: 400px;
  .title {
    color: #4a00e0;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .filters {
    display: flex;
  }
`

const SmallFilter = ({ brandItems, categoryItems }) => {
  const [showFilter, setShowFilter] = useState(false)

  const openFilterHandler = () => {
    setShowFilter(true)
  }

  const closeFilterHandler = () => {
    setShowFilter(false)
  }

  return (
    <>
      <Button onClick={openFilterHandler}>
        <FilterIcon />
      </Button>
      {showFilter && (
        <Modal closeHandler={closeFilterHandler}>
          <ModalDiv>
            <div className="title">Filter</div>
            <div className="filters">
              <CategoryFilter items={categoryItems} />
              <BrandFilter items={brandItems} />
            </div>
          </ModalDiv>
        </Modal>
      )}
    </>
  )
}

export default SmallFilter
