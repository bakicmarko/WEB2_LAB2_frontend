import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Update from "./Update";

const Views = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/logout" element={<Home />} />
      <Route path="/update" element={<Update />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
