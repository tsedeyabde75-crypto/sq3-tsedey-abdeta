import { signIn } from "@/app/actions/auth";

export default function SignInPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white p-8 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to Addis Eats</h1>
        <form action={signIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              defaultValue="tsedeyabde75@gmail.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}