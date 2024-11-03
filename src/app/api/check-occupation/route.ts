import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

/**
 * @swagger
 * /api/check-occupation:
 *   post:
 *     summary: Check if user has an occupation
 *     description: Checks if the authenticated user has an occupation set in the database.
 *     responses:
 *       200:
 *         description: Occupation check result
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
 *           occupationExists: true
 *         500:
 *           error: "Database error"
 *           details: "Error checking occupation in database"
 */

export async function POST(request: Request) {
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    console.warn("[CHECK_OCCUPATION] Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!existingUser) {
      console.warn("[CHECK_OCCUPATION] User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const occupationExists = !!existingUser.occupation;
    console.info("[CHECK_OCCUPATION] Occupation check successful");
    return NextResponse.json({ occupationExists });
  } catch (error) {
    console.error("[CHECK_OCCUPATION] Internal Error", error);
    return NextResponse.json({ error: "Database error", details: "Error checking occupation in database" }, { status: 500 });
  }
}