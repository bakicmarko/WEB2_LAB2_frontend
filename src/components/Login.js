import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Center,
  HStack,
  Container,
} from "@chakra-ui/react";

import { Form, Formik, Field } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "./AccountContext";

const Login = () => {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch("http://localhost:4000/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            console.log(err);
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              console.log(data.status);
            } else if (data.loggedIn) {
              navigate("/home");
            }
          });
      }}
    >
      {() => (
        <Center h="100vh">
          <Form>
            <Field name="username">
              {({ field }) => (
                <FormControl>
                  <FormLabel>username</FormLabel>
                  <Input {...field} placeholder="username" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl>
                  <FormLabel>password</FormLabel>
                  <Input {...field} placeholder="password" />
                </FormControl>
              )}
            </Field>
            <HStack display="flex" marginTop={5}>
              <Container flex={1}></Container>
              <Button mt={4} colorScheme="teal" type="submit">
                Login
              </Button>
              <Container flex={1}></Container>
            </HStack>
          </Form>
        </Center>
      )}
    </Formik>
  );
};

export default Login;
