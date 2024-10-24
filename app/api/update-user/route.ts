import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { firstName, lastName, pronouns, occupation, gender, birthday } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { clerkUserId: userId },
      data: {
        firstName,
        lastName,
        pronouns,
        occupation,
        gender,
        birthday: new Date(birthday),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}