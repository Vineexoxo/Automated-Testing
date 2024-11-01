import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

/**
 * @swagger
 * /api/check-occupation:
 *   post:
 *     summary: Check user occupation
 *     description: Checks if the authenticated user has an occupation set.
 *     responses:
 *       200:
 *         description: Occupation check result.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 occupationExists:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to check occupation
 */
export async function POST(request: Request) {
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const occupationExists = !!existingUser.occupation;

    return NextResponse.json({ occupationExists });
  } catch (error) {
    console.error('Error checking occupation:', error);
    return NextResponse.json({ error: "Failed to check occupation" }, { status: 500 });
  }
}