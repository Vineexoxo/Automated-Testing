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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Email is required
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
 *           message: "User deleted successfully"
 *         500:
 *           error: "Database error"
 *           details: "Error deleting user from database"
 */

// Delete user data
export async function DELETE(request: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            console.warn("[USER_DELETE] Unauthorized access attempt");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the authenticated user
        const authUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!authUser || authUser.role !== 'ADMIN') {
            console.warn("[USER_DELETE] Unauthorized access by non-admin user");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = new URL(request.url);
        const email = url.searchParams.get("email");

        if (!email) {
            console.warn("[USER_DELETE] Email is required");
            return new NextResponse("Email is required", { status: 400 });
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.warn("[USER_DELETE] User not found");
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

        console.info("[USER_DELETE] User deleted successfully");
        return new NextResponse("User deleted successfully", { status: 200 });
    } catch (error) {
        console.error("[USER_DELETE] Internal Error", error as Error);
        if ((error as any).code === 'P2025') { // Prisma specific error for record not found
            console.warn("[USER_DELETE] User not found during deletion");
            return new NextResponse("User not found", { status: 404 });
        }
        return NextResponse.json({ error: "Database error", details: "Error deleting user from database" }, { status: 500 });
    }
}