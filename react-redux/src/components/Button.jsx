import styled, { css } from "styled-components";

const Button = styled.button`
    padding: 17px 15px 14px;
    font-weight: bold;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    transition: all 0.2s;
    cursor: pointer;

    ${(props) =>
        props.primary
            ? css`
                  background-color: #598df2;
                  box-shadow: 0px 2px 5px rgba(89, 140, 242, 0.4);
              `
            : css`
                  background-color: #e45a5a;
              `}

    &:disabled {
        cursor: not-allowed;

        ${(props) =>
            props.primary
                ? css`
                      background-color: #5f7db9;
                  `
                : css`
                      background-color: #a56565;
                  `}
    }
`;

export default Button;
