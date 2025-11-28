import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";

function Navbar() {
  const { user, setUser, token, setToken } = useAuth();
  const [open, setOpen] = useState(false);

  function handleSignout() {
    setUser(null);
    setToken(null);
  }
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <img src="/logo.png" className="w-8 h-8" alt="" />
        <span>Blog</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="visible md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>
        {/* dropdown */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out bg-[#e6e6ff] z-50 ${
            open ? "-right-0" : "-right-[100%] "
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/" onClick={() => setOpen(false)}>
            About
          </Link>
          {user ? (
            <>
              {user.isAuthor && (
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              )}
              <div className="border-b border-black">
                Welcome, {user.username}!
              </div>
              <button
                onClick={() => {
                  handleSignout();
                  setOpen(false);
                }}
                className="py-2 px-4 rounded-3xl bg-blue-800 text-white"
              >
                Signout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setOpen(false)}>
                Sign up
              </Link>
              <Link to="/signin" onClick={() => setOpen(false)}>
                <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        {user ? (
          <>
            {user.isAuthor && (
              <Link to="/admin" onClick={() => setOpen(false)}>
                Admin
              </Link>
            )}
            <div className="border-b border-black">
              Welcome, {user.username}!
            </div>
            <button
              onClick={() => {
                handleSignout();
                setOpen(false);
              }}
              className="py-2 px-4 rounded-3xl bg-blue-800 text-white"
            >
              Signout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Sign in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
