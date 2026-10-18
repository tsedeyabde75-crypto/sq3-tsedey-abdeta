import { NextResponse } from 'next/server';

const USERS = [
  {
    id: "1",
    name: "Tsedey Abdeta",
    email: "tsedeyabde75@gmail.com",
    password: "Password123!"
  },
  {
    id: "2",
    name: "Demo Guest",
    email: "user@example.com",
    password: "Password123!"
  }
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const user = USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials. User not found.' },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid credentials. Password incorrect.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });

    response.cookies.set('session', `token-${user.id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}