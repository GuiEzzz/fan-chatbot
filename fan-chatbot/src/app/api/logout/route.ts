// /app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET() {
  const res = NextResponse.json({ success: true });
  res.headers.set('Set-Cookie', serialize('authToken', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  }));
  return res;
}
