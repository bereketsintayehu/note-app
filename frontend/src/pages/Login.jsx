import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const registerLinkStyle = {
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  const errorStyle = {
      color: 'red',
      fontSsize: '14px',
      marginTop: '5px'
  }

  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success('Succesffullly logged in')
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const isFormEmpty = email.trim() === '' || password.trim() === '';
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ...

return (
  <>
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login to start making notes</p>
    </section>

    <section className="form">
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={email}
        placeholder="Enter your email"
        onChange={onChange}
      />
      {!isEmailValid && email.trim() !== '' && (
        <p className="feedback">Please enter a valid email address</p>
      )}
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={password}
        placeholder="Enter your password"
        onChange={onChange}
      />
    </div>
    {isError && (
      <p className="error-feedback" style={errorStyle}>Incorrect email or password. Please try again.</p>
    )}
    <div className="form-group">
      <button
        type="submit"
        className="btn btn-block"
        disabled={isFormEmpty || !isEmailValid}
        style={{
          opacity: isFormEmpty || !isEmailValid ? 0.5 : 1,
          cursor: isFormEmpty || !isEmailValid ? 'not-allowed' : 'pointer',
        }}
        title={isFormEmpty ? 'Please enter both email and password' : ''}
      >
        Submit
      </button>
    </div>
    <div style={registerLinkStyle} className="form-group">
      <Link to="/register" style={{ color: 'inherit' }}>
        Don't have an account? Register
      </Link>
    </div>
  </form>
</section>
  </>
);

}

export default Login;
