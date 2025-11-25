import { useAuth } from "../contexts/authProvider";
import PostListPage from "./PostListPage";
import Loader from "../components/Loader";

function Homepage() {
  const { user, setUser, token, setToken } = useAuth();
  return (
    <div className="">
      {user ? <p>Welcome, {user.username}!</p> : <p>Please log in.</p>}
      <Loader />
      <PostListPage />
    </div>
  );
}

export default Homepage;
