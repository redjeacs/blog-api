import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className=" min-h-screen flex flex-col px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Navbar />
      <div className="flex flex-1 justify-center items-center">
        <Outlet />
        {/* BreadCrumb */}
        {/* Introduction */}
        {/* Featured Posts */}
        {/* Post List */}
      </div>

      <Footer />
    </div>
  );
};

export default App;
