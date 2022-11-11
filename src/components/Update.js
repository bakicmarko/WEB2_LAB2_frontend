import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Center,
  HStack,
  Container,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./constant/constants";

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

const Update = () => {
  //const baseUrl = "https://web2-lab-backend.onrender.com";
  //const baseUrl = "http://localhost:5000";
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ newUsername: "" }}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        const e = validateUsername(vals.newUsername);
        if (e != null) {
          alert(e);
          return;
        }
        fetch(`${baseUrl}/profile/update`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            console.log(err);
            console.log("im here");
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
            console.log(data);
            setData(data.message);
          });
      }}
    >
      {({ errors }) => (
        <Center h="100vh">
          <Form>
            <Field name="newUsername">
              {({ field }) => (
                <FormControl>
                  <FormLabel>newUsername</FormLabel>
                  <Input {...field} placeholder="newUsername" />
                </FormControl>
              )}
            </Field>
            <VStack>
              <Button mt={4} colorScheme="teal" type="submit">
                Update
              </Button>

              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => navigate("/home")}
              >
                Go on home
              </Button>
            </VStack>
            {data != null ? `response: ${data}` : null}
          </Form>
        </Center>
      )}
    </Formik>
  );
};

export default Update;
