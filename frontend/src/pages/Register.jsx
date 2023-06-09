import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const loginLinkStyle = {
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
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

    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }

    if (name.trim() === '') {
      toast.error('Please enter your name');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(getPasswordRequirement());
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  const isValidEmail = (email) => {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password) => {
    // Custom password requirements (e.g., at least 8 characters, one uppercase, one lowercase, one digit)
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  };

  const getPasswordRequirement = () => {
    const requirements = [];

    if (password.length < 8) {
      requirements.push('at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      requirements.push('at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      requirements.push('at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      requirements.push('at least one digit');
    }

    return `Please enter a strong password (${requirements.join(', ')})`;
  };

  const getPasswordStrength = (password) => {
    // Custom logic to determine password strength
    const strength = password.length < 8 ? 0 : password.length < 10 ? 1 : 2;
    return strength;
  };

  if (isLoading) {
    return <Spinner />;
  }

  const isFormEmpty = name.trim() === '' || email.trim() === '' || password.trim() === '' || password2.trim() === '';
  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  const passwordStrength = getPasswordStrength(password);

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
            {!name.trim() && <p className="error-message">Please enter your name</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
            {!isEmailValid && email.trim() && <p className="error-message">Please enter a valid email</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
            {!isPasswordValid && password.trim() && (
              <p className="error-message">{getPasswordRequirement()}</p>
            )}
            {password.trim() && (
              <div className="password-strength-meter">
                <div className={`strength-bar strength-${passwordStrength}`} />
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={onChange}
            />
            {password.trim() && password !== password2 && (
              <p className="error-message">Passwords do not match</p>
            )}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              disabled={isFormEmpty || !isEmailValid || !isPasswordValid || password !== password2}
              style={{
                opacity:
                  isFormEmpty || !isEmailValid || !isPasswordValid || password !== password2 ? 0.5 : 1,
                cursor: isFormEmpty || !isEmailValid || !isPasswordValid || password !== password2 ? 'not-allowed' : 'pointer',
              }}
            >
              Submit
            </button>
          </div>
          <div className="form-group">
            <Link to="/login" className="login-link" style={loginLinkStyle}>
              Already Registered? Login
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
