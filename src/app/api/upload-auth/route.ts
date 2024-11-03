import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * @swagger
 * /api/upload-auth:
 *   get:
 *     summary: Generate upload authentication token
 *     description: Generates a token and signature for upload authentication.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional token to use, otherwise a random UUID is generated.
 *       - in: query
 *         name: expire
 *         required: false
 *         schema:
 *           type: string
 *         description: Expiration time in seconds since epoch, defaults to 2400 seconds from now.
 *     responses:
 *       200:
 *         description: Authentication token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expire:
 *                   type: string
 *                 signature:
 *                   type: string
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
 *           token: "random-uuid"
 *           expire: "1700000000"
 *           signature: "abcdef1234567890"
 *         500:
 *           error: "Configuration error"
 *           details: "PRIVATE_KEY is not defined"
 */

const privateKey = process.env.PRIVATE_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || crypto.randomUUID();
    const expire = searchParams.get('expire') || (Math.floor(Date.now() / 1000) + 2400).toString();
    if (!privateKey) {
        console.error("[UPLOAD_AUTH] PRIVATE_KEY is not defined");
        return NextResponse.json({ error: "Configuration error", details: "PRIVATE_KEY is not defined" }, { status: 500 });
    }
    const privateAPIKey = privateKey;
    const signature = crypto.createHmac('sha1', privateAPIKey).update(token + expire).digest('hex');

    console.info("[UPLOAD_AUTH] Token generated successfully");
    return NextResponse.json({
        token,
        expire,
        signature
    });
}