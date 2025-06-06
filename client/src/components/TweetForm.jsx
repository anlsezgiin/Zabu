import { useState } from 'react';
import axios from '../api/axios';

export default function TweetForm() {
  const [tweetLink, setTweetLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleAnalyze = async () => {
    if (!tweetLink) return setFeedback('Tweet link is required.');

    setLoading(true);
    setFeedback('');

    try {
      const res = await axios.post('/analysis', { tweetLink });
      setFeedback(res.data.message);
    } catch (err) {
      setFeedback(err.response?.data?.error || 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={tweetLink}
          onChange={(e) => setTweetLink(e.target.value)}
          placeholder="Enter tweet link"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {feedback && <p className="text-sm text-blue-600">{feedback}</p>}
    </div>
  );
}
