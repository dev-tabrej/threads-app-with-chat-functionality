import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login({ isloggedIn, setIsLoggedIn }) {
  return (
    <Stack minH={"500px"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        borderRadius={"10px"}
        boxShadow={useColorModeValue("0 0  20px ", "0px 0px 10px black")}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              color={useColorModeValue("white", "gray.800")}
            >
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an Account?{" "}
              <Link
                color={"blue.400"}
                onClick={() => {
                  setIsLoggedIn(!isloggedIn);
                }}
              >
                SignUp
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
