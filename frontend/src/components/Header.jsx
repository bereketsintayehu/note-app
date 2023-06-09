import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import './confirmDialog.css'

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      dispatch(logout());
      dispatch(reset());
      toast.success('Logged out successfully');
      navigate('/');
    } else {
      toast.info('Logout cancelled');
    }
  };

  return (
    <nav className="header">
      <div className="logo">
        <Link to="/">Note App</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/account">
                <FaUser /> Account
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
