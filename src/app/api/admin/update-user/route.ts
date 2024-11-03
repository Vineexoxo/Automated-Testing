import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client

/**
 * @swagger
 * /api/admin/update-user:
 *   post:
 *     summary: Update user information
 *     description: Updates user information in the database, excluding id, clerkUserId, email, and phoneNumber.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
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
 *                 format: date-time
 *               imageUrl:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     pronouns:
 *                       type: string
 *                     occupation:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     birthday:
 *                       type: string
 *                       format: date-time
 *                     imageUrl:
 *                       type: string
 *                     username:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Email is required
 *       500:
 *         description: Internal Error
 */

// Update user data
export async function POST(request: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the authenticated user
        const authUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!authUser || authUser.role !== 'ADMIN') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await request.json();
        const { email, name, firstName, lastName, pronouns, occupation, gender, birthday, imageUrl, username } = data;

        if (!email) {
            return new NextResponse("Email is required", { status: 400 });
        }

        // Update the user in the database using email
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                name,
                firstName,
                lastName,
                pronouns,
                occupation,
                gender,
                birthday,
                imageUrl,
                username,
            },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("[USER_UPDATE]", error);
        if ((error as any).code === 'P2003') { // Prisma specific error for foreign key constraint violation
            return new NextResponse("Foreign key constraint violated", { status: 400 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}