import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Check authentication status
 *     description: Returns authentication status and user information.
 *     responses:
 *       200:
 *         description: User is authenticated
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
 *           message: "Authenticated"
 *           data:
 *             userId: "user_123"
 *             username: "johndoe"
 *         500:
 *           error: "Internal error"
 *           details: "Error retrieving user data"
 */

export async function GET() {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId) {
    console.warn("[DATA_GET] Not Authenticated");
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  try {
    console.info("[DATA_GET] User authenticated successfully");
    return NextResponse.json(
      {
        message: "Authenticated",
        data: { userId: userId, username: user?.username },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DATA_GET] Internal Error", error);
    return NextResponse.json({ error: "Internal error", details: "Error retrieving user data" }, { status: 500 });
  }
}