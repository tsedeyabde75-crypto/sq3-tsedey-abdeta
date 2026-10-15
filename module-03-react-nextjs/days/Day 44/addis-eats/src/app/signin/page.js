import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = params?.next ?? "/";

  async function handleSignIn(formData) {
    "use server";
    
    const user = { id: "usr_1", name: "Almaz", role: "customer" };
    const token = Buffer.from(JSON.stringify(user)).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Note: secure cookies require HTTPS, so localhost development often uses process.env.NODE_ENV === "production" or false on http://localhost
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const safeNext = next.startsWith("/") ? next : "/";
    redirect(safeNext);
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In to Addis Eats</h1>
      <form action={handleSignIn} className="flex flex-col gap-4">
        <input name="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" className="border p-2 rounded" />
        <button type="submit" className="bg-orange-600 text-white p-2 rounded">Sign In</button>
      </form>
    </main>
  );
}