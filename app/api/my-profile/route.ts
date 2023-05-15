import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function GET(req: Request) {
  const { userId } = auth();
}
