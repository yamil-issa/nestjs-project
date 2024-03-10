import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import '../styles/LoginPage.css'

const Login = () => {
 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      let token = response.data.token;
      //console.log(response.data);
      console.log(token);

      // Redirect to Kanban page after successful login
      navigate('/board', { state: { token } });
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
      <div className="form_container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
          </form>
        <div className="link"><p>You don't have an account ?</p> <p><Link to="/signup">SignUp</Link></p></div>

      </div>
  );
};

export default Login;
