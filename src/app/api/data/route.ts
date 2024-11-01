import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get user data
 *     description: Returns authentication status and user data.
 *     responses:
 *       200:
 *         description: User is authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     username:
 *                       type: string
 *       401:
 *         description: Not Authenticated
 */
export async function GET() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  return NextResponse.json(
    {
      message: "Authenticated",
      data: { userId: userId, username: user?.username },
    },
    { status: 200 }
  );
}