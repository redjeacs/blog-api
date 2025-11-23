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

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/users/session");
        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };

    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
