import styled from 'styled-components'
import { shade } from 'polished'

export const ButtonWrapper = styled.button`
    background: #ff9000;
    color: #312e38;

    border-radius: 10px;
    border: 0;

    height: 56px;
    padding: 0 16px;
    width: 100%;
    margin-top: 16px;

    font-weight: 600;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff9000')}
    }
`
