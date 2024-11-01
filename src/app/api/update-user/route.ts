import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

/**
 * @swagger
 * /api/update-user:
 *   post:
 *     summary: Update user information
 *     description: Updates the authenticated user's information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               pronouns:
 *                 type: string
 *               occupation:
 *                 type: string
 *               gender:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               imageUrl:
 *                 type: string
 *               cityEmojis:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     emoji:
 *                       type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 pronouns:
 *                   type: string
 *                 occupation:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 birthday:
 *                   type: string
 *                   format: date
 *                 imageUrl:
 *                   type: string
 *                 cityEmojis:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                       emoji:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */
export async function POST(request: Request) {
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { firstName, lastName, pronouns, occupation, gender, birthday, imageUrl, cityEmojis } = await request.json();

  try {
    const birthdayDate = new Date(birthday);

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
          deleteMany: {}, 
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
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}