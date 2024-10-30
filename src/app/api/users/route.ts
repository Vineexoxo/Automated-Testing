import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Make sure this points to your Prisma client

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get current user from database
    const currentUser = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Get all users except current user
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: currentUser.id // Exclude current user
        }
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        imageUrl: true,
        occupation: true,
        username: true,
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("[USERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}