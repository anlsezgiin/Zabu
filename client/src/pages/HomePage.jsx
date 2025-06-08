import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';

export default function HomePage() {
  return (
    <div className="min-h-screen w-screen p-6 bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome back, Zabu 👋</h1>
      <TweetForm />
      <TweetList /> 
    </div>
  );
}
