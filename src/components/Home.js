import { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import {
  Button,
  Center,
  HStack,
  Input,
  FormControl,
  Text,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const { Navigate } = require("react-router");

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const handleLogout = () => {
  fetch("http://localhost:4000/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location.reload(false);
};

const Home = () => {
  const [data, setData] = useState(null);
  const isLoggedIn = useAuth();
  return isLoggedIn ? (
    <Formik
      initialValues={{
        username: "",
        sqlVulnSwitch: false,
        csrfVulnSwitch: false,
      }}
      onSubmit={(values, actions) => {
        actions.setFieldValue("username", "");
        console.log("fetching");
        console.log(values.csrfVulnSwitch);
        console.log(values.sqlVulnSwitch);
        fetch(
          `http://localhost:4000/info?userquery=${values.username}&sqlVulnSwitch=${values.sqlVulnSwitch}&csrfVulnSwitch=${values.csrfVulnSwitch}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .catch((err) => {
            console.log(err);
            console.log("err");
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              console.log("err23");
              return;
            }
            console.log("got data");
            return res.json();
          })
          .then((data) => setData(data));
      }}
    >
      {(props) => (
        <Center h="100vh">
          <Form>
            <HStack>
              <Field name="username">
                {({ field }) => (
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="username"
                      height={50}
                      width={300}
                    />
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" type="submit">
                Get info
              </Button>
            </HStack>
            <VStack marginTop={5} marginBottom={20}>
              <Button onClick={handleLogout}>Logout</Button>
              <Switch
                size="lg"
                name="sqlVulnSwitch"
                value={props.values.sqlVulnSwitch}
                onChange={(value) => {
                  props.setFieldValue(
                    "sqlVulnSwitch",
                    !props.values.sqlVulnSwitch
                  );
                }}
              >
                SQL vulnerability
              </Switch>
              <Switch
                size="lg"
                name="csrfVulnSwitch"
                value={props.values.csrfVulnSwitch}
                onChange={() => {
                  props.setFieldValue(
                    "csrfVulnSwitch",
                    !props.values.csrfVulnSwitch
                  );
                }}
              >
                CSRF vulnerability
              </Switch>
            </VStack>
            {data != null
              ? data.map((row) => (
                  <Text key={row.acc_id}>{JSON.stringify(row)}</Text>
                ))
              : null}
          </Form>
        </Center>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;