import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Register() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      await login(email, password);
      navigate('/');
    } catch (e) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 440 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Create account</h2>
        <p style={{ marginTop: 4, color: '#475569' }}>Join the organization portal</p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
          <div>
            <label>Name</label>
            <input className="input" value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
          <div>
            <label>Email</label>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>
        <p style={{ marginTop: 12 }}>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}


