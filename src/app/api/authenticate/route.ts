import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

/**
 * @swagger
 * /api/authenticate:
 *   get:
 *     summary: Authenticate user
 *     description: Authenticates the user and retrieves their information.
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAuth:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     clerkUserId:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 *     examples:
 *       application/json:
 *         200:
 *           isAuth: true
 *           user:
 *             id: "123"
 *             clerkUserId: "clerk_123"
 *             email: "user@example.com"
 *             name: "John Doe"
 *             imageUrl: "http://example.com/image.jpg"
 *         500:
 *           error: "Database error"
 *           details: "Error retrieving or creating user in database"
 */

export async function GET() {
  console.log("[AUTHENTICATE] Authenticating user...");
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    console.error("[AUTHENTICATE] Authentication failed: User not found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`[AUTHENTICATE] User authenticated: ${user.id}`);

  try {
    let loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      console.log("[AUTHENTICATE] User not found in database, checking by email...");
      const existingUser = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
      });

      if (existingUser) {
        console.log("[AUTHENTICATE] Existing user found, updating clerkUserId...");
        loggedInUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { clerkUserId: user.id },
        });
      } else {
        console.log("[AUTHENTICATE] No existing user found, creating new user...");
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

    console.info("[AUTHENTICATE] User authentication and retrieval successful");
    return NextResponse.json({ isAuth: !!userId, user: loggedInUser });
  } catch (error) {
    console.error("[AUTHENTICATE] Internal Error", error);
    return NextResponse.json({ error: "Database error", details: "Error retrieving or creating user in database" }, { status: 500 });
  }
}