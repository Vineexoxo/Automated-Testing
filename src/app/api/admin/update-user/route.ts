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
 *           user: {
 *             "id": "123",
 *             "name": "John Doe",
 *             "firstName": "John",
 *             "lastName": "Doe",
 *             "pronouns": "he/him",
 *             "occupation": "Engineer",
 *             "gender": "male",
 *             "birthday": "1990-01-01T00:00:00Z",
 *             "imageUrl": "http://example.com/image.jpg",
 *             "username": "johndoe"
 *           }
 *         500:
 *           error: "Database error"
 *           details: "Error updating user in database"
 */

// Update user data
export async function POST(request: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            console.warn("[USER_UPDATE] Unauthorized access attempt");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the authenticated user
        const authUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!authUser || authUser.role !== 'ADMIN') {
            console.warn("[USER_UPDATE] Unauthorized access by non-admin user");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await request.json();
        const { email, name, firstName, lastName, pronouns, occupation, gender, birthday, imageUrl, username } = data;

        if (!email) {
            console.warn("[USER_UPDATE] Email is required");
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

        console.info("[USER_UPDATE] User updated successfully");
        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("[USER_UPDATE] Internal Error", error);
        if ((error as any).code === 'P2003') { // Prisma specific error for foreign key constraint violation
            console.warn("[USER_UPDATE] Foreign key constraint violated");
            return new NextResponse("Foreign key constraint violated", { status: 400 });
        }
        return NextResponse.json({ error: "Database error", details: "Error updating user in database" }, { status: 500 });
    }
}