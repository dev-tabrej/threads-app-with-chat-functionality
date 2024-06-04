import React from "react";
import { Flex } from "@chakra-ui/react";
import { Box, Image, useColorMode } from "@chakra-ui/react";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mb={12} mt={6}>
      <Image
        cursor="pointer"
        src={colorMode === "light" ? "/light-logo.svg" : "/dark-logo.svg"}
        alt="logo"
        w={6}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}

export default Header;
