import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      BASE_URL + "/logout",
      {},
      { withCredentials: true }
    );
    dispatch(removeUser());
    navigate("/login");
  };

  const logoClick = () => {
    if (user) navigate("/");
  };

  return (
    <div className="navbar bg-base-300 shadow-md px-4 sticky top-0 z-50">
      
      {/* Logo */}
      <div className="flex-1">
        <button
          onClick={logoClick}
          className="btn btn-ghost text-2xl font-bold tracking-wide hover:scale-105 transition"
        >
          👩‍💻
          <span className="ml-2 bg-linear-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            DevTinder
          </span>
        </button>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-4">
          
          {/* Welcome */}
          <span className="hidden sm:block text-sm text-gray-300">
            Welcome,{" "}
            <span className="font-semibold text-white">
              {user.firstName}
            </span>
          </span>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-300 ring-offset-2 hover:ring-secondary transition"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoUrl || "https://via.placeholder.com/100"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-xl mt-4 w-52 p-2 shadow-xl border border-base-100"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
