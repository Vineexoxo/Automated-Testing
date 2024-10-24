import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = auth();
  const user = await currentUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  res.status(200).json({ isAuth: !!userId });
}