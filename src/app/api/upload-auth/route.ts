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
 *         schema:
 *           type: string
 *         description: Optional token for authentication.
 *       - in: query
 *         name: expire
 *         schema:
 *           type: string
 *         description: Optional expiration time for the token.
 *     responses:
 *       200:
 *         description: Authentication token generated successfully.
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
 *         description: Server configuration error
 */
const privateKey = process.env.PRIVATE_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || crypto.randomUUID();
    const expire = searchParams.get('expire') || (Math.floor(Date.now() / 1000) + 2400).toString();
    if (!privateKey) {
        throw new Error('PRIVATE_KEY is not defined');
    }
    const privateAPIKey = privateKey;
    const signature = crypto.createHmac('sha1', privateAPIKey).update(token + expire).digest('hex');

    return NextResponse.json({
        token,
        expire,
        signature
    });
}