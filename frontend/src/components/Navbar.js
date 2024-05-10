import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MyStuff</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">login </Link>
              <Link to="/signup">signup </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
