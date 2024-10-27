import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { firstName, lastName, pronouns, occupation, gender, birthday, imageUrl, cityEmojis } = await request.json();

  try {
    // Convert birthday string to Date object
    const birthdayDate = new Date(birthday);

    // Check if user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { clerkUserId: user.id },
      data: {
        firstName,
        lastName,
        pronouns,
        occupation,
        gender,
        birthday: birthdayDate,
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
        cityEmojis: true, // Include cityEmojis in the response
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}