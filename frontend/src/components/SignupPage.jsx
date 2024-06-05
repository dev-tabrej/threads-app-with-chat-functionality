import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupPage({ isloggedIn, setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      console.log(inputs);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(inputs);
  return (
    <Flex minH={"500px"} align={"center"} justify={"center"}>
      <Stack spacing={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={useColorModeValue("0 0  20px ", "0px 0px 10px black")}
          p={8}
        >
          <Stack spacing={4} px={2}>
            <Stack spacing={4} w={"full"} maxW={"xl"}>
              <Heading fontSize={"2xl"} padding={"0 0 10px 0"} my={"5px"}>
                Sign up
              </Heading>
            </Stack>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email </FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.password}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                color={useColorModeValue("white", "gray.800")}
                colorScheme={"blue"}
                variant={"solid"}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => {
                    setIsLoggedIn(!isloggedIn);
                  }}
                >
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
