import { useNavigate } from "react-router";
import { baseUrl } from "./constant/constants";
const { createContext, useState, useEffect } = require("react");
export const AccountContext = createContext();
//const baseUrl = "https://web2-lab-backend.onrender.com";
// const baseUrl = "http://localhost:5000";

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${baseUrl}/login`, {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((r) => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        navigate("/home");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
