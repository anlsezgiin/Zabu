import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function TweetList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const normalize = (row) => {
    let id = null;
    let username = null;
    let content = null;
    let emotion = null;
    let summary = null;
    let date = null;

    for (const key of Object.keys(row)) {
      const value = row[key];

      if (/^\d{4}-\d{2}-\d{2}T/.test(key)) {
        date = key;
      }

      if (['Positive', 'Negative', 'Notr'].includes(key)) {
        emotion = key;
      }

      if (key.toLowerCase().includes('tweet')) {
        summary = key;
      }

      if (typeof key === 'string' && key.length > 10 && key.includes(' ')) {
        content = key;
      }

      if (!isNaN(Number(key)) && key.length <= 20) {
        id = key;
      }

      if (
        typeof key === 'string' &&
        /^[a-zA-Z0-9_]{2,30}$/.test(key) &&
        key !== emotion &&
        key !== summary
      ) {
        username = key;
      }
    }

    return {
      id,
      username: row[username] || 'unknown',
      content,
      emotion,
      summary,
      date: date ? new Date(date).toLocaleString() : 'Unknown date',
    };
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('/getData');
      setData(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
    }
  };

  if (!data.length)
    return <p className="text-gray-500 text-center mt-6">No tweets analyzed yet.</p>;

  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Analyzed Tweets</h2>
      <div className="space-y-4">
        {data.map((row, i) => {
          const item = normalize(row);
          return (
            <div key={item.id || i} className="p-4 border rounded-lg bg-slate-50 shadow-sm">
              <p className="font-bold">@{item.username}</p>
              <p className="text-sm text-gray-700 mt-1 mb-2">{item.content}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>🧠 {item.summary}</span>
                <span className="font-semibold">{item.emotion}</span>
              </div>
              <p className="text-xs mt-2 text-right text-gray-500">{item.date}</p>
              <p className="text-[10px] text-gray-400 text-right">id: {item.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
