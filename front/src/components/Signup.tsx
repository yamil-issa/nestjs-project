// src/components/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';


const Signup = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/signup', { username, email, password });
      console.log(response.data);
      navigate('/login')

    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={username} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
        <p>You already have an account ? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
