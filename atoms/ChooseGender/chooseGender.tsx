import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { genderActions } from '@Store/genderSlice'

const Div = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: start;
  padding: 20px 50px;
  position: relative;

  .titleGender {
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      text-decoration: none;
      color: inherit;

      cursor: pointer;

      .icon {
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
      }

      p {
        font-size: 24px;
        font-weight: 500;
        margin-left: 8px;
      }
    }
  }

  .titleGender:hover {
    background-color: black;
    color: white;
    transition: 0.3s;
  }

  @media (max-width: 640px) {
    .titleGender {
      a {
        padding: 0;

        .icon {
          width: 38px;
        }

        p {
          font-size: 22px;
        }
      }
    }
  }
`

const ChooseGender = () => {
  const dispatch = useDispatch()
  const setGender = (value: string) => {
    dispatch(genderActions.setGender(value))
    return;
  }
  return (
    <Div>
      <h1 className="titleGender">
        <a onClick={() => setGender('Homme')}>
          <p>Hommes</p>
        </a>
      </h1>
      <h1 className="titleGender">
        <a onClick={() => setGender('Femme')}>
          <p>Femmes</p>
        </a>
      </h1>
      <h1 className="titleGender">
        <a onClick={() => setGender('Enfant')}>
          <p>Enfants</p>
        </a>
      </h1>
    </Div>
  )
}

export default ChooseGender
