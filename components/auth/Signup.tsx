import React, { useState } from 'react';

interface SignupProps {
  onSignupSuccess: (userName: string) => void;
  switchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignupSuccess, switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignupSuccess(name || 'Friend');
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-text-primary mb-2">Create Account</h2>
      <p className="text-text-secondary mb-6">Start tracking your cycle today!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
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
          Sign Up
        </button>
      </form>
      <p className="text-center text-sm text-text-secondary mt-6">
        Already have an account?{' '}
        <button onClick={switchToLogin} className="font-semibold text-primary hover:underline">
          Log In
        </button>
      </p>
    </div>
  );
};

export default Signup;
