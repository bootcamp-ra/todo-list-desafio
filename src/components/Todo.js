import styled from "styled-components";
import React from "react";

export default function Todo(props) {
  var { children, index, onRemove, onTaskClick, isChecked } = props;

  return (
    <Container isChecked={isChecked} onClick={() => onTaskClick(index)}>
      <TrashContainer
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        <ion-icon name="trash"></ion-icon>
      </TrashContainer>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 250px;
  position: relative;
  transition: 300ms all ease;
  left: -35px;
  cursor: pointer;

  &:hover {
    left: 0;
  }

  ${({ isChecked }) =>
    isChecked &&
    `text-decoration: line-through;
    color: rgb(71, 71, 71);`}

  p {
    text-align: center;
    padding-left: 10px;
  }

  ion-icon {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const TrashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(201, 57, 57);
  height: 40px;
  width: 35px;
  cursor: pointer;
`;
