import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
  switchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials. Here, we'll just log in.
    onLoginSuccess(); 
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome Back!</h2>
      <p className="text-text-secondary mb-6">Log in to continue your journey.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-pink-500 transition-colors">
          Log In
        </button>
      </form>
      <p className="text-center text-sm text-text-secondary mt-6">
        Don't have an account?{' '}
        <button onClick={switchToSignup} className="font-semibold text-primary hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
