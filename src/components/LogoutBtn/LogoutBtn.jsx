import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../redux/authSlice";
import "./LogoutBtn.css";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <button className="logout-btn" onClick={logoutHandler}>
      Logout
    </button>
  );
}
export default LogoutBtn;
