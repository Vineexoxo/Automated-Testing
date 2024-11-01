import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 * @swagger
 * /api/friend-requests:
 *   post:
 *     summary: Send a friend request
 *     description: Sends a friend request from the authenticated user to another user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiverId:
 *                 type: string
 *                 description: The ID of the user to send the friend request to.
 *     responses:
 *       200:
 *         description: Friend request sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 senderId:
 *                   type: string
 *                 receiverId:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Friend request already exists.
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { receiverId } = await req.json();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkUserId: userId }
    });

    if (!currentUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Check if friend request already exists
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: currentUser.id, receiverId },
          { senderId: receiverId, receiverId: currentUser.id }
        ]
      }
    });

    if (existingRequest) {
      return new NextResponse("Friend request already exists", { status: 400 });
    }

    // Create friend request
    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: currentUser.id,
        receiverId,
        status: "PENDING"
      }
    });

    return NextResponse.json(friendRequest);
  } catch (error) {
    console.error("[FRIEND_REQUEST_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}