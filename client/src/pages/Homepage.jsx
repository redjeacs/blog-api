import { useAuth } from "../contexts/authProvider";

function Homepage() {
  const { user, setUser, token, setToken } = useAuth();
  console.log(user, token);
  return (
    <div className="">
      {user ? <p>Welcome, {user.username}!</p> : <p>Please log in.</p>}
    </div>
  );
}

export default Homepage;
