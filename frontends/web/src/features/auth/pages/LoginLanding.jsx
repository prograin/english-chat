import TelegramLoginWidget from "../components/TelegrmLoginWidget";

export default function LoginLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Login with Telegram</h1>
        <p className="text-gray-500 mb-8">Connect with your Telegram account to continue.</p>
        <TelegramLoginWidget />
      </div>
      <p className="mt-6 text-white text-sm">By logging in, you agree to our Terms and Privacy Policy.</p>
    </div>
  );
}
