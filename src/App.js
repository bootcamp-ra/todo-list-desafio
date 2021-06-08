import React from "react";
import styled from "styled-components";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <Container>
      <Header />
      <TodoList />
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  background: linear-gradient(to right, #4568dc, #b06ab3);
  height: 100vh;
`;

const Header = styled.div`
  height: 50px;
  width: 100%;
  background: #0052D4;
`;
