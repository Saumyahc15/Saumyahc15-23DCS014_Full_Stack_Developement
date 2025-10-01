import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Dashboard</h2>
        <p>Welcome, {user?.name}!</p>
        <p style={{ color: '#475569' }}>This is a protected page only visible after login.</p>
      </div>
    </div>
  );
}


