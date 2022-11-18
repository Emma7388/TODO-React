import { Button, Container, Box, Text } from "@chakra-ui/react";

import React from "react";

//Props!
const ListTask = ({ listTask, deleteClick, editClick, idList }) => {
  return (
    <>
      <Container
        padding={"10px"}
        centerContent
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        border="1px solid black"
        height="100%"
        maxWidth="100vw"
        overflowWrap={"anywhere"}
        flexWrap={"wrap"}
        minWidth={"280px"}
      >
        <Text
          display="flex"
          maxWidth={"100%"}
          overflowWrap={"anywhere"}
          color="white"
        >
          {idList + 1} - {listTask}
        </Text>

        <Box
          color="white"
          gap="5px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Button
            height="30px"
            fontSize="10px"
            onClick={() => editClick(listTask)}
            backgroundColor="black"
          >
            Edit
          </Button>
          <Button
            color={"red"}
            bg="black"
            height="30px"
            fontSize="10px"
            onClick={() => deleteClick(listTask)}
          >
            Remove
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default ListTask;
