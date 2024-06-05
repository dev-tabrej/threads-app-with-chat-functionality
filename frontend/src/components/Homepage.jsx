import React from "react";
import { Link } from "react-router-dom";
import { Button, Center, Flex } from "@chakra-ui/react";

function Homepage() {
  return (
    <Link to={"/markzukerberg"}>
      <Flex w={"full"} justifyContent={"Center"}>
        <Button>Hello</Button>
      </Flex>
    </Link>
  );
}

export default Homepage;
