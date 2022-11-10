import { Routes, Route } from "react-router-dom";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import Login from "./Login";
import Home from "./Home";

const Views = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/logout" element={<Home />} />
      <Route path="/logeed" element={<Button>dasda</Button>} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
