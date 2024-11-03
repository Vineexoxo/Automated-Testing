import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client

/**
 * @swagger
 * /api/admin/read-user:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetches a list of all users from the database.
 *     responses:
 *       200:
 *         description: A list of users
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
 *                       clerkUserId:
 *                         type: string
 *                       email:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       pronouns:
 *                         type: string
 *                       occupation:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       birthday:
 *                         type: string
 *                         format: date-time
 *                       imageUrl:
 *                         type: string
 *                       username:
 *                         type: string
 *                       cityEmojis:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             city:
 *                               type: string
 *                             emoji:
 *                               type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Error
 */

// Read user data
export async function GET() {
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

        // Get all users from the database
        const users = await prisma.user.findMany({
            select: {
                id: true,
                clerkUserId: true,
                email: true,
                name: true,
                phoneNumber: true,
                firstName: true,
                lastName: true,
                pronouns: true,
                occupation: true,
                gender: true,
                birthday: true,
                imageUrl: true,
                username: true,
                cityEmojis: true, // Ensure this is included
            }
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("[USERS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}