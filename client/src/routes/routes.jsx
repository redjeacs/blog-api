import Homepage from "../pages/Homepage";
import SigninPage from "../pages/SigninPage";
import AdminPage from "../pages/AdminPage";
import PostListPage from "../pages/PostListPage";
import PostPage from "../pages/PostPage";
import SignUpPage from "../pages/SignUpPage";
import App from "../App";
import WritePage from "../pages/WritePage";
import EditPage from "../pages/EditPage";

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
        path: "/admin",
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "/admin/write",
            element: <WritePage />,
          },
          {
            path: "/admin/:postId",
            element: <EditPage />,
          },
        ],
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
