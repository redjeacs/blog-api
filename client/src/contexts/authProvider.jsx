import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error("useAuth must be used within a AuthProvider");

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) {
      // Optionally fetch user session with token
      api
        .get("/users/session", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.user))
        .catch(() => setUser(null));
    }
  }, [token]);

  // Persist token to localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
