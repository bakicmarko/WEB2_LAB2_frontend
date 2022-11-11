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

import { useNavigate, Navigate } from "react-router";

import { baseUrl } from "./constant/constants";

// const baseUrl = "https://web2-lab-backend.onrender.com";
// const baseUrl = "http://localhost:5000";

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const handleLogout = async () => {
  await fetch(`${baseUrl}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (process.env.REACT_APP_ENVIRONMENT === "production") {
  } else window.location.href = "/";
  //if (res.status === 204) window.location.href = "/";
};

function validateUsername(value) {
  let error = null;
  console.log(value);
  const regex = new RegExp("^[A-Za-z][A-Za-z0-9_]{3,14}$");
  if (value === "" || regex.test(value) === false) {
    error = "Invalid input!";
  }
  console.log(error);
  return error;
}

const Home = () => {
  const [data, setData] = useState(null);
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  return isLoggedIn ? (
    <Formik
      initialValues={{
        username: "",
        sqlVulnSwitch: false,
        csrfVulnSwitch: false,
      }}
      onSubmit={(values, actions) => {
        actions.setFieldValue("username", "");
        const vals = { ...values };
        const e = validateUsername(vals.newUsername);
        if (e != null) {
          alert(e);
          return;
        }
        fetch(
          `${baseUrl}/info?userquery=${values.username}&sqlVulnSwitch=${values.sqlVulnSwitch}&csrfVulnSwitch=${values.csrfVulnSwitch}`,
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
              <Input type="hidden" name="_csrf" value="{{csrfToken}}"></Input>
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
            <Button onClick={() => navigate("/update")}>go on update</Button>
          </Form>
        </Center>
      )}
    </Formik>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
