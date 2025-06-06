import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function TweetList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/getData');
      console.log('Fetched data:', res.data.data);
      setData(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err.message);
    }
  };

  if (!data.length) return <p className="text-gray-500">No tweets analyzed yet.</p>;

  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold mb-2">Analyzed Tweets:</h2>
      <div className="space-y-4">
        {data.map((row, i) => (
          <div key={row.id || i} className="p-4 border rounded-lg bg-slate-50">
            <p className="font-bold">@{row.username || 'unknown'}</p>
            <p className="text-sm text-gray-700 mt-1 mb-2">
              {row.content || 'No content'}
            </p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>🧠 {row.summary || '-'}</span>
              <span className="font-semibold">{row.emotion || '-'}</span>
            </div>
            <p className="text-xs mt-1 text-right">
              {row.date ? new Date(row.date).toLocaleString() : 'Unknown date'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
