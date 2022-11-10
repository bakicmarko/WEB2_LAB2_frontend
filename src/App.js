// client/src/App.js
import React from "react";
import UserContext from "./components/AccountContext";
import Views from "./components/Views";

function App() {
  return (
    <>
      <UserContext>
        <Views></Views>
      </UserContext>
    </>
  );
}
export default App;
