import React from "react";
import {
  Button,
  ChakraProvider,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Container,
  Box,
} from "@chakra-ui/react";
import ListTask from "./ListTask";
import { useState } from "react";
//

//
export const TodoForm = () => {
  //
  //un solo useState pa los input y Button, no me maten!
  const [state, setState] = useState({
    list: [],
    inputText: "",
    modalInputText: "",
    selectedTask: null,
    isOpen: false,
  });

  //Acciones
  const onClose = () => {
    setState({ ...state, isOpen: false });
  };

  const onChange = (e) => {
    setState({ ...state, inputText: e.target.value });
  };

  const deleteThisTask = (deleteTask) => {
    let newTask = state.list.filter((task) => {
      if (task !== deleteTask) {
        return task;
      } else {
        return ``;
      }
    });
    return setState({ ...state, list: newTask });
  };

  const deleteAllClick = () => {
    state.list.filter((task) => {
      if (task) {
        return task;
      } else {
        return ``;
      }
    });
    return setState({ ...state, list: [] });
  };

  ///Fin Acciones

  ////SUBMITS

  /////Input
  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      let serchedSameOn = state.list.find(
        (lista) => lista === event.target.value
      );
      let stateToUpperOn = state.inputText.toUpperCase();

      console.log(stateToUpperOn);

      if (stateToUpperOn === serchedSameOn) {
        return alert("This task already exist");
      } else if (event.keyCode === 13 && state.inputText === "") {
        return alert("No task ingresed");
      } else {
        setState({
          ...state,
          list: state.list.concat(event.target.value),
          inputText: "",
        });
      }
    }
  };

  //// Button/////
  const submitClick = (event) => {
    let serchedSame = state.list.find((lista) => lista === event.target.value);
    let stateToUpper = state.inputText.toUpperCase();

    if (stateToUpper === serchedSame) {
      return alert("This task already exist");
    } else if (!state.inputText) {
      return alert("No task ingresed");
    } else {
      setState({
        ...state,
        list: state.list.concat(event.target.value),
        inputText: "",
      });
    }
  };

  /////FIN SUBMITS

  //// SUBMITS MODAL
  const modalWindow = () => {
    setState({ ...state, isOpen: false });

    if (!state.modalInputText) {
      return alert("ni ingresaste cambio");
    }

    let newList = state.list.map((task) => {
      if (task === state.selectedTask) {
        return state.modalInputText.toUpperCase();
      } else {
        return task;
      }
    });
    setState({ ...state, list: newList, isOpen: false });
  };

  const onChangeModal = (e) => {
    setState({ ...state, modalInputText: e.target.value });
  };

  const editTaskModal = (editTask) => {
    setState({
      ...state,
      selectedTask: editTask,
      isOpen: true,
    });
  };

  /////FIN SUBMITS MODAL

  return (
    <ChakraProvider>
      <Container
        height={"100%"}
        padding={"10px"}
        centerContent
        gap={"10px"}
        backgroundColor="#252525"
      >
        <Text color="#ffffffbb">TODO List React</Text>
        <Input
          width="50%"
          minWidth="280px"
          textAlign="center"
          color="#ffffffbb"
          value={state.inputText.toUpperCase()}
          placeholder="Add Task"
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
        <Box gap={"10px"} display="flex">
          <Button
            onChange={onChange}
            value={state.inputText.toUpperCase()}
            onClick={submitClick}
          >
            Submit
          </Button>

          {state.list.length > 1 ? (
            <Button onClick={deleteAllClick}>Delete All</Button>
          ) : (
            state.list.length
          )}
        </Box>

        {/* ACA RENDERIZA MAPEO DE LISTA FINAL*/}

        {state.list.map((listTask, idList) => {
          return (
            //ACAWOOOOON!               //<state.list.length>

            <ListTask
              editClick={editTaskModal}
              deleteClick={deleteThisTask}
              listTask={listTask}
              idList={idList}
              key={idList}
            ></ListTask>
          );
        })}
      </Container>
      {/* MODAL */}

      <Modal isOpen={state.isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modify Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={state.modalInputText.toUpperCase()}
              placeholder="Update TODO"
              onChange={onChangeModal}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button
              onChange={onChange}
              value={state.inputText.toUpperCase()}
              onClick={modalWindow}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};
