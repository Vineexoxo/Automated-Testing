import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function GET() {
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!loggedInUser) {
    // Check if a user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: user.emailAddresses[0].emailAddress },
    });

    if (existingUser) {
      // If user exists with this email but different clerkUserId, update the clerkUserId
      loggedInUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: { clerkUserId: user.id },
      });
    } else {
      // If no user exists with this email, create a new user
      loggedInUser = await prisma.user.create({
        data: {
          clerkUserId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }
  }

  return NextResponse.json({ isAuth: !!userId, user: loggedInUser });
}