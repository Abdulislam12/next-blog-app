'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState('user');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          role: activeTab,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        window.location.href = '/login';
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        {/* Tabs for User/Admin */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 font-semibold rounded-l ${activeTab === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-semibold rounded-r ${activeTab === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Registering...' : `Register as ${activeTab}`}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
