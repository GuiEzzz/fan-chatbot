import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const validUser = process.env.LOGIN_USER;
  const validPass = process.env.LOGIN_PASS;

  if (username === validUser && password === validPass) {
    const token = 'fake-auth-token'; // (futuramente pode ser um JWT real)

    const res = NextResponse.json({ success: true });

    res.headers.set('Set-Cookie', serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 horas
      sameSite: 'lax',
    }));

    return res;
  } else {
    return NextResponse.json({ success: false, error: "Credenciais inválidas" }, { status: 401 });
  }
}
