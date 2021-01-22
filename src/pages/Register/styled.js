import styled from 'styled-components';
import * as Color from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label {
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    border-radius: 5px;

    &:focus {
      border: 1px solid ${Color.primaryColor};
    }
  }
`;
