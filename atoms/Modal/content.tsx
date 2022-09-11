import styled from 'styled-components'

export const ModalDiv = styled.div`
  padding: 16px;

  .title {
    color: #4a00e0;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .table {
    overflow: auto;

    table {
      border-collapse: collapse;
      font-size: 14px;
      width: 474px;

      &.jeans {
        width: 356px;
      }

      th {
        font-weight: 500;
      }

      td,
      th {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        text-align: center;
        padding: 16px;
      }

      tr {
        th:first-child,
        td:first-child {
          border-left: 1px solid #ddd;
        }

        th:last-child,
        td:last-child {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
`