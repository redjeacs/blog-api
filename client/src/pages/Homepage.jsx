import { useAuth } from "../contexts/authProvider";

function Homepage() {
  const { user, setUser } = useAuth();
  console.log(user);
  return <div className="">{user.id}</div>;
}

export default Homepage;
