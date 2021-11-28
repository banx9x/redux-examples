import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, clear } from "../slices/todo.slice";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Container from "./Container";
import styled from "styled-components";
import { selectTotal } from "../slices/todo.slice";
import Button from "./Button";
import { selectStatus } from "../slices/todo.slice";

const H1 = styled.h1`
    font-weight: bold;
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 30px;
`;

const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const App = () => {
    const dispatch = useDispatch();
    const total = useSelector(selectTotal);
    const status = useSelector(selectStatus);

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    return (
        <Container>
            <H1>Simple Todo App</H1>

            <TodoForm />

            <TodoList />

            <Footer>
                {!status.loading ? (
                    <>
                        <span>
                            You have <b>{total}</b> pending task
                        </span>
                        {total > 0 && (
                            <Button onClick={() => dispatch(clear())}>
                                Clear All
                            </Button>
                        )}
                    </>
                ) : (
                    "Loading..."
                )}
            </Footer>
        </Container>
    );
};

export default App;
