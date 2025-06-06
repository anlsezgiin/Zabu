import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [sheetLink, setSheetLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!sheetLink) return setError('Please enter your Google Sheets link.');

    try {
      const res = await axios.post('/postLink', { sheetLink });

      // ✅ HTTP 200 ise yönlendir
      if (res.status === 200) {
        navigate('/home');
      } else {
        setError('Invalid sheet link.');
      }
    } catch (err) {
      // ❌ Diğer durumlar
      const msg =
        err.response?.data?.error ||
        err.response?.statusText ||
        'Server error.';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Zabu 🧠</h1>
        <input
          type="text"
          value={sheetLink}
          onChange={(e) => setSheetLink(e.target.value)}
          placeholder="Google Sheets link..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white text-gray-800 placeholder-gray-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Start
        </button>
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}
