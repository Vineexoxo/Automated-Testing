import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { firstName, lastName, pronouns, occupation, gender, birthday, imageUrl, cityEmojis } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { clerkUserId: userId },
      data: {
        firstName,
        lastName,
        pronouns,
        occupation,
        gender,
        birthday: new Date(birthday),
        imageUrl,
        cityEmojis: {
          deleteMany: {}, // Remove existing city-emoji pairs
          create: cityEmojis.map((ce: { city: string; emoji: string }) => ({
            city: ce.city,
            emoji: ce.emoji,
          })),
        },
      },
      include: {
        cityEmojis: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}