import { useAuth } from "../contexts/authProvider";
import PostListPage from "./PostListPage";
import { Link } from "react-router-dom";

function Homepage() {
  const { user, setUser, token, setToken } = useAuth();
  return (
    <div className="">
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>
          Please{" "}
          <Link to="/signin" className="text-blue-700">
            Sign In.
          </Link>
        </p>
      )}
      <PostListPage />
    </div>
  );
}

export default Homepage;
