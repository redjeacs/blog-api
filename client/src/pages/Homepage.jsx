import { useAuth } from "../contexts/authProvider";

function Homepage() {
  const { user, setUser, token, setToken } = useAuth();
  console.log("user ", user);
  console.log("token ", token);
  return <div className="">homepage</div>;
}

export default Homepage;
