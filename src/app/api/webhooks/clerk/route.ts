import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Use the singleton instance

/**
 * @swagger
 * /api/webhooks/clerk:
 *   post:
 *     summary: Handle Clerk webhooks
 *     description: Processes webhooks from Clerk, such as user creation events.
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *       400:
 *         description: Bad request due to missing headers or verification failure
 *       500:
 *         description: Server error due to configuration or processing issues
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
 *           message: "New user created"
 *           user:
 *             id: "123"
 *             email: "user@example.com"
 *             firstName: "John"
 *             lastName: "Doe"
 *             imageUrl: "http://example.com/image.jpg"
 *         500:
 *           error: "Database error"
 *           details: "Error creating user in database"
 */

async function createUser(user: {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
}) {
  try {
    return await prisma.user.create({
      data: {
        clerkUserId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.photo,
        // Add other fields as necessary
      },
    });
  } catch (error) {
    console.error("[WEBHOOK] Error creating user in database:", error);
    throw new Error("Database error");
  }
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("[WEBHOOK] WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Configuration error", details: "WEBHOOK_SECRET is not set" }, { status: 500 });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("[WEBHOOK] Missing Svix headers");
    return NextResponse.json({ error: "Bad request", details: "Missing Svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    const error = err as Error; // Type assertion
    console.error("[WEBHOOK] Error verifying webhook:", error);
    return NextResponse.json({ error: "Verification failed", details: error.message }, { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || "DefaultUsername", // Provide a default value
      photo: image_url || "DefaultPhotoUrl",   // Provide a default value
      firstName: first_name || "DefaultFirstName",
      lastName: last_name || "DefaultLastName",
    };

    console.log("[WEBHOOK] Creating user:", user);

    try {
      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser.id,
          },
        });
      }

      console.info("[WEBHOOK] New user created successfully");
      return NextResponse.json({ message: "New user created", user: newUser });
    } catch (error) {
      console.error("[WEBHOOK] Error processing user creation:", error);
      return NextResponse.json({ error: "Database error", details: "Error creating user in database" }, { status: 500 });
    }
  }

  console.log(`[WEBHOOK] Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("[WEBHOOK] Webhook body:", body);

  return new Response("", { status: 200 });
}