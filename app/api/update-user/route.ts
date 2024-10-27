import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, pronouns, occupation, gender, birthday, imageUrl, cityEmojis } = req.body;

      // Assuming you have the user's ID from Clerk authentication
      const clerkUserId = req.headers['x-clerk-user-id'] as string;

      const updatedUser = await prisma.user.update({
        where: { clerkUserId },
        data: {
          firstName,
          lastName,
          pronouns,
          occupation,
          gender,
          birthday: new Date(birthday),
          imageUrl,
          cityEmojis: {
            deleteMany: {}, // Remove existing city-emoji pairs
            create: cityEmojis.map((ce: { city: string; emoji: string }) => ({
              city: ce.city,
              emoji: ce.emoji,
            })),
          },
        },
        include: {
          cityEmojis: true,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}