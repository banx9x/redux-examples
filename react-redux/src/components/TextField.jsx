import styled from "styled-components";

const TextField = styled.input`
    height: 46px;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border: 0;
    outline: none;
    flex: 1;

    &::placeholder {
        color: rgba(91, 91, 91, 0.75);
    }
`;

export default TextField;
