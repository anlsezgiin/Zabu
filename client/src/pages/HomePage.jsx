import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';

export default function HomePage() {
  return (
    <div className="min-h-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Welcome back, Zabu 👋</h1>
      <TweetForm />
    </div>
  );
}
