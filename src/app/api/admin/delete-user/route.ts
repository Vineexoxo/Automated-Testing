import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client



/**
 * @swagger
 * /api/admin/delete-user:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from both the PostgreSQL database and Clerk.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Error
 */

// Delete user data
export async function DELETE(request: Request) {
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

        const url = new URL(request.url);
        const email = url.searchParams.get("email");

        if (!email) {
            return new NextResponse("Email is required", { status: 400 });
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Delete CityEmoji entries for the user
        await prisma.cityEmoji.deleteMany({
            where: { userId: user.id },
        });

        // Delete Friendship entries for the user
        await prisma.friendship.deleteMany({
            where: {
                OR: [
                    { userId: user.id },
                    { friendId: user.id },
                ],
            },
        });

        // Delete user from PostgreSQL database using email
        await prisma.user.delete({
            where: { email },
        });

        // Assuming Clerk also supports deletion by email, otherwise adjust accordingly
        await clerkClient.users.deleteUser(user.clerkUserId);

        return new NextResponse("User deleted successfully", { status: 200 });
    } catch (error) {
        console.error("[USER_DELETE]", error as Error);
        if ((error as any).code === 'P2025') { // Prisma specific error for record not found
            return new NextResponse("User not found", { status: 404 });
        }
        return new NextResponse("Internal Error", { status: 500 });
    }
}