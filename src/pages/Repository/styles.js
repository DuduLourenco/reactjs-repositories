import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #494e6b;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const SelectIssueState = styled.select`
  background: #494e6b;
  border: 0;
  padding: 3px 4px;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 15px;
`;

export const Pagination = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background: #494e6b;
    border: 0;
    padding: 6px 8px;
    border-radius: 4px;
    color: #fff;
  }

  button:disabled {
    color: #494e6b;
    background: #fff;
    border: 1px solid #494e6b;
    cursor: default;
  }
`;

export const IssueList = styled.ul`
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid #494e6b;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #494e6b;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #494e6b;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #494e6b;
          }
        }

        span {
          background: #494e6b;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
