import { useAuth } from "../contexts/authProvider";

function Homepage() {
  const { user, setUser, token, setToken } = useAuth();
  return <div className="">homepage</div>;
}

export default Homepage;
