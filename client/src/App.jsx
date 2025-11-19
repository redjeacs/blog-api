import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Navbar />
      <Outlet />
      {/* BreadCrumb */}
      {/* Introduction */}
      {/* Featured Posts */}
      {/* Post List */}
    </div>
  );
};

export default App;
