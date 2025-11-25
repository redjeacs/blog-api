import Homepage from "../pages/Homepage";
import SigninPage from "../pages/SigninPage";
import WritePage from "../pages/WritePage";
import PostListPage from "../pages/PostListPage";
import PostPage from "../pages/PostPage";
import SignUpPage from "../pages/SignUpPage";
import App from "../App";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
      },
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
];

export default routes;
