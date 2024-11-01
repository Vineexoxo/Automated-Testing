import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Make sure this points to your Prisma client

/**
    * @swagger
    * /api/users:
    *   get:
    *     summary: Retrieve a list of users
    *     description: Get all users except the current authenticated user.
    *     responses:
    *       200:
    *         description: A list of users.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 users:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       id:
    *                         type: string
    *                       firstName:
    *                         type: string
    *                       lastName:
    *                         type: string
    *                       imageUrl:
    *                         type: string
    *                       occupation:
    *                         type: string
    *                       username:
    *                         type: string
    *       401:
    *         description: Unauthorized
    *       404:
    *         description: User not found
    *       500:
    *         description: Internal server error
    */
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